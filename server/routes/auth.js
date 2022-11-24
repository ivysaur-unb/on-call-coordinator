var express = require('express');
var router = express.Router();
const { getUserByEmail } = require('../persist/users');
const { tokenify, untokenify } = require('../persist/auth');

const prisma = require('../prismaClient');

router.post('/', async function (req, res, next) {
    if(!req.body.email || !req.body.password) {
        res.status(401);
        res.send("Invalid arguments");
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


router.get('/', function (req, res, next) {
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
