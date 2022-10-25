var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

/* GET Course*/
router.get('/', async function(req, res) {
    const course = await prisma.course.findFirst({name: req.course.name});
    res.send(course);
});

/* CREATE Course */
router.post('/', async function(req,res,next){
    let course =  new Promise((res,resp)=>{
     return 'hello';
    })
    if(req.body){
      course = await prisma.course.create({data:{   
        teachable: req.body.teachable,
        courseCode: req.body.courseCode,
        title: req.body.title,
        grade: req.body.grade,
        pathway: req.body.pathway,
     }});
     console.log(course);
    }
     res.send(course);
   })

module.exports = router;