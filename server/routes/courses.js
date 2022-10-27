var express = require('express');
var router = express.Router();
const { createTeachables } = require('../helpers/createTeachables');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

/* GET Course*/
router.get('/', async function(req, res) {
    const course = await prisma.class.findFirst({
      where: {title: 'Exploring Technologies'},
    });
    res.send(course);
});

/* GET Teachable ID */
/*router.get('/teachableId', async function(req, res) {
  const course = await prisma.class.findFirst({
    where: {title: 'Exploring Technologies'},
  });
  res.send(course);
});*/

/* CREATE Course */
router.post('/', async function(req,res,next){
    let course =  new Promise((res,resp)=>{
     return 'hello';
    })
    //createTeachables();
    let errors = [];
    if(req.body){
      try {
        course = await prisma.class.create({data:{   
          teachable: {
            connect: { id: (await prisma.teachable.findFirst({where: {name: course.teachableName}})).id }
          },
          courseCode: req.body.courseCode,
          title: req.body.title,
          grade: req.body.grade,
          pathway: req.body.pathway,
       }});
      } catch (err) {
        console.log(err);
        errors.push(err);
      } 
      
     console.log(course);
    }
     //TODO(maybe?) return object with course and errors, indicate errors in browser
     res.send(course);
   })

module.exports = router;