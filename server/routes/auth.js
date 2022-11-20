var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getUserByEmail } = require('./users');
dotenv.config();

const prisma = require('../prismaClient');

function tokenify(user) {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: '10000s' });
    return token;

}

function untokenify(token) {
    let user = null;
    
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
}

router.post('/', async function (req, res, next) {
    if(!req.body.email || !req.body.password) {
        res.status(401);
        res.send("Invalid Request");
        return;
    }
    const user = await getUserByEmail(req.body.email, req.body.password);
    if (user == null) {
        res.status(401);
        res.send("User does not exist!");
    }

    else {
        const token = tokenify(user);
        res.send({ token: token });
    }
})


router.get('/', async function (req, res, next) {
    try {
        const user = untokenify(req.headers['authorization']);
        res.send({ user: { ...user, password: null }});
    }
    catch (TokenExpiredError) {
        res.status(403);
        res.send();
    }

});

module.exports = router;
module.exports.tokenify=tokenify;
module.exports.untokenify = untokenify;
