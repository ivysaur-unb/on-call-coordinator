const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { tokenify } = require('./auth');
const prisma = require('../prismaClient');
const { getUserByEmail } = require('../persist/users');

dotenv.config();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const allMyUsers = await prisma.user.findMany()
  res.send(allMyUsers);
});

/* GET specific User. */
router.get('/find', async function(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  });
  if(!user){
    return res.send({result: false});
  }
  return res.send({result: true});
});

module.exports = router;