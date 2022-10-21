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
    let name = req.body.name;
    let address = req.body.address;
    let numberOfStudents = req.body.numberOfStudents;
    let specialityPrograms = req.body.specialityPrograms;

    if(!specialityPrograms || !name || !address || !numberOfStudents ){
      res.status(422);
      res.send();
      return;
    }
   //make sure you have all the parameters
    if(numberOfStudents < 0){
      res.status(422);
      res.send();
      return;
    }
  
    let test = await prisma2.school.create({data:{
        name: req.body.name,
        address:req.body.address,
        numberOfStudents: req.body.numberOfStudents,
        specialityPrograms: req.body.specialityPrograms
    }})
  res.send(test);
})


router.delete('/', async function(req,res,next){
    let response = await prisma2.school.delete({
      where:{
        id: req.body.id
      }
    })

    res.send(response);
})
module.exports = router;
