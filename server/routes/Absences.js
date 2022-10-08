var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

const { PrismaClient } = require('@prisma/client')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const prisma = new PrismaClient()
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allMyUsers = await prisma.absence.findMany()
  res.send(allMyUsers)
});

router.post('/', async function(req,res,next){
 
   let tester = await prisma.absence.create({data:{    
    teacherID: req.body.teacherId,
    day: req.body.day,
    period: req.body.period

  }});
 
  res.send(tester);
})

module.exports = router;
