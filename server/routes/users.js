var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { PrismaClient } = require('@prisma/client')

dotenv.config();

const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allMyUsers = await prisma.user.findMany()
  res.send(allMyUsers)
});


async function getUserByEmail(email, password) {

  let result = await prisma.user.findFirst({
    where: {
      email: email,
      password: password
    }

  })

  return result;
}

module.exports = router;
