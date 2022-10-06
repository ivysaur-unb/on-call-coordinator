var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");

const { PrismaClient } = require('@prisma/client')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const prisma = new PrismaClient()
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allMyUsers = await prisma.user.findMany()
  res.send(allMyUsers)
});

router.post('/', async function(req,res,next){
 
 let tester =  new Promise((res,resp)=>{
  return 'hello';
 })
 if(req.body){
   tester = await prisma.user.create({data:{    
    email: req.body.email,
    name: req.body.name,
    role:'USER'
  }});
 }
  res.send(tester);
})

module.exports = router;



 /*
  const tester = await prisma.user.create({data:{    
    email: "test36@gmail.com",
    name: 'tester',
    role:'USER'
  }});
  */