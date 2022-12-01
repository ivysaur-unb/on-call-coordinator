const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../persist/users');
const { tokenify, untokenify } = require('../persist/auth');
const argon2 = require("argon2");

router.post('/', async function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        res.status(401);
        res.send('Invalid arguments');
        return;
    }
    const user = await getUserByEmail(req.body.email);
    if (user == null) {
        res.status(401);
        res.send('User does not exist!');
    } else {
        if(await argon2.verify(user.passwordHash, req.body.password)) {
          const token = tokenify(user);
          res.status(200);
          res.send({ token });
        } else {
          res.status(401);
          res.send("Invalid Credentials");
        }
    }
});

router.get('/', function (req, res, next) {
    try {
        const user = untokenify(req.headers['authorization']);
        res.send({ user: { ...user, passwordHash: null } });
    } catch (TokenExpiredError) {
        res.status(403);
        res.send();
    }
});

module.exports = router;
