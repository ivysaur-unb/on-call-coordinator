const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const getSchools = require('../persist/school').getSchools;
const deleteSchools = require('../persist/school').deleteSchools;
const postSchools = require('../persist/school').postSchools; 

const prisma = require("../prismaClient");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


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
    console.log(e);
    next(e);
  }
})


router.delete('/', async function(req,res,next){
  res.send(await deleteSchools(req.body));
})

module.exports = router;

