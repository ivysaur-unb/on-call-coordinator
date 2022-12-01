const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const getUserByEmail = require('../persist/users').getUserByEmail;
const prisma = require('../prismaClient');

dotenv.config();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allMyUsers = await prisma.user.findMany()
  res.send(allMyUsers);
});




router.post('/login', async function (req, res, next) {
  if(!req.body.email || !req.body.password) {
    res.status(401);
    res.send("Invalid arguments");
    return;
  }
  const user = await getUserByEmail(req.body.email);
  if (user == null) {

    res.status(401);
    res.send("User does not exist!");

  }

  else {
    const token = await tokenify(user);

    res.send({ token: token });
  }
})

module.exports = router;
