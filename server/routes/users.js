var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allMyUsers = await prisma.user.findMany()
  res.send(allMyUsers);
});

router.post('/', async function(req,res,next){

  let tester =  new Promise((res,resp)=>{
   return 'hello';
  })
  if(req.body){
    tester = await prisma.user.create({data:{    
     email: req.body.email,
     name: req.body.name,
     role:'TEACHER'
   }});
   console.log(tester);
  }
   res.send(tester);
 })

module.exports = router;
