var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
//const { courses } = require('../../client/src/Courses');

const prisma = new PrismaClient()

/* Helper to get Initials */
const getInitials = function(name){
  var names = name.split(' '),
  initials = names[0].substring(0, 1).toUpperCase();
    
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}


/* GET Teachers. */
router.get('/', async function(req, res) {
    const allMyUsers = await prisma.user.findMany()
    res.send(allMyUsers);
});

/* CREATE Teacher */
router.post('/', async function(req,res,next){
    let teacher =  new Promise((res,resp)=>{
     return 'hello';
    })
    if(req.body){
      teacher = await prisma.user.create({data:{    
       email: req.body.email,
       name: req.body.name,
       role:'TEACHER',
       Teacher: {
        create: {
          initials: getInitials(req.body.name),//need to write function to get initials
          Course: {
            create: req.body.courses
          }
        },
       }

     }});
     console.log(teacher);
    }
     res.send(teacher);
   })

module.exports = router;