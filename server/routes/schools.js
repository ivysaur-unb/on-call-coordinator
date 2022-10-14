var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

const { PrismaClient } = require('@prisma/client')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const prisma2 = new PrismaClient()
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allMyUsers = await prisma2.school.findMany()
  res.send(allMyUsers)
});

router.post('/', async function(req,res,next){
 
    let test = await prisma2.school.create({data:{
        name: req.body.name,
        address:req.body.address,
        numberOfStudents: req.body.numberOfStudents,
        specialityPrograms: req.body.specialityPrograms
    }})
    /*
   let tester = await prisma.absence.create({data:{    
    teacherId: req.body.teacher,
    day: req.body.day,
    period: req.body.period

  }});
 */
  res.send(test);
})

module.exports = router;
