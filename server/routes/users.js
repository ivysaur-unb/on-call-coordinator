var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allMyUsers = await prisma.user.findMany()
  res.send(allMyUsers);
});

module.exports = router;
