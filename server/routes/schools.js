var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

const { PrismaClient } = require('@prisma/client')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

async function getSchools(){
  const allMySchools = await prisma2.school.findMany();
  return allMySchools
}

async function postSchools(body){
  let name = body.name;
  let address = body.address;
  let numberOfStudents = body.numberOfStudents;
  let specialityPrograms = body.specialityPrograms;

  if(!specialityPrograms || !name || !address || !numberOfStudents ){
    return 422;
  }
 //make sure you have all the parameters
  if(numberOfStudents < 0){
    return 422;
  }

  if(numberOfStudents > 1000000000){
    return 507;
  }

  let test = await prisma2.school.create({data:{
      name: body.name,
      address:body.address,
      numberOfStudents: body.numberOfStudents,
      specialityPrograms: body.specialityPrograms
  }})
  return test;
}

async function deleteSchools(body){
  let response = await prisma2.school.delete({
    where:{
      id: body.id
    }
  })

  return response
}

const prisma2 = new PrismaClient()
/* GET users listing. */
router.get('/',  async function(req,res,next){
  res.send(await getSchools());
});

router.post('/', async function(req,res,next){
  try{
  res.send(await postSchools(req.body));
  }
  //i dont expect any errors but in case there is it will not crash the database
  catch(e){
    res.send(500);
  }
})


router.delete('/', async function(req,res,next){
  res.send(await deleteSchools(res.body));
})

module.exports = router;
module.exports.deleteSchools = deleteSchools;
module.exports.postSchools = postSchools;
module.exports.getSchools = getSchools;
