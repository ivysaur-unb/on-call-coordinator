const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const testFunction = require('../routes/assignOnCalls').testOnCall;
const prisma = require("../prismaClient");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

async function getSchools() {
  const allMySchools = await prisma.school.findMany();
  return allMySchools
}

async function postSchools(body) {
  let name = body.name;
  let address = body.address;
  let numberOfStudents = body.numberOfStudents;
  let specialityPrograms = body.specialityPrograms;

  if(!specialityPrograms || !name || !address || !numberOfStudents ){
    return 422;
  }
 //make sure you have all the parameters
  if(numberOfStudents < 0) {
   
    return 422;
  }

  let test = await prisma.school.create({data:{
      name: body.name,
      address:body.address,
      numberOfStudents: body.numberOfStudents,
      specialityPrograms: body.specialityPrograms
  }})
  return test;
}

async function deleteSchools(body){
  let response = await prisma.school.delete({
    where:{
      id: body.id
    }
  })

  return response
}

/* GET users listing. */
router.get('/',  async function(req,res,next){
  res.send(await getSchools());
});

router.post('/', async function(req,res,next){
  testFunction()
  //res.send(await postSchools(req.body));
})


router.delete('/', async function(req,res,next){
  res.send(await deleteSchools(req.body));
})

module.exports = router;
module.exports.deleteSchools = deleteSchools;
module.exports.postSchools = postSchools;
module.exports.getSchools = getSchools;
