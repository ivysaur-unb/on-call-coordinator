var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var app = express();
const server = require('http').Server(app);
const { PrismaClient } = require('@prisma/client')
const { getUserByEmail } = require('./users');
const port = 3001;
dotenv.config();

const prisma = new PrismaClient()

async function tokenify(user) {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(user, jwtSecretKey, { expiresIn: '10000s' });
    return token;

}

async function untokenify(token) {
    let user = null;
    
    user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
}

router.post('/', async function (req, res, next) {

    const user = await getUserByEmail(req.body.email, req.body.password);
    if (user == null) {
        res.status(401);
        res.send("User does not exist!");
    }

    else {
        const token = await tokenify(user);
        res.send({ token: token });
    }
})


router.get('/', async function (req, res, next) {
    try {
        const user = await untokenify(req.headers['authorization']);
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
