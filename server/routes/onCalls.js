var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

router.post('/', async function(req,res,next){
    let onCalls =  new Promise((res,resp)=>{
     return 'hello';
    })
    
    let errors = [];
    if(req.body){
      try {
        onCalls = await prisma.onCall.findMany({
            where: {
                teacherId: req.body.tId,
            },
            select: {
                id: true,
                day: true,
                scheduledClass: {
                    select: {
                        class: true,
                        period: true,
                        location: true
                    }
                }
            }
        })

      } catch (err) {
        console.log(err);
        errors.push(err);
      } 
      
     //console.log(t);
    }
     //TODO(maybe?) return object with course and errors, indicate errors in browser
     res.send(onCalls);
   });

router.post('/teachers', async function(req,res,next){
    let t =  new Promise((res,resp)=>{
     return 'hello';
    })
    let errors = [];
    if(req.body){
      try {
        t = await prisma.teacher.findMany()

      } catch (err) {
        console.log(err);
        errors.push(err);
      } 
      
    }
     //TODO(maybe?) return object with course and errors, indicate errors in browser
     res.send(t);
   });

   router.post('/forTeachers', async function(req,res,next){
    let onCalls =  new Promise((res,resp)=>{
     return 'hello';
    })
    let errors = [];
    if(req.body){
      try {
        onCalls = await prisma.onCall.findMany({
        where: {
            teacherId: req.body.tId,
        },
        select: {
            id: true,
            day: true,
            scheduledClass: {
                select: {
                    class: true,
                    period: true,
                    location: true
                }
            }
        }
    })

      } catch (err) {
        console.log(err);
        errors.push(err);
      } 
      
    }
    console.log(onCalls);
     //TODO(maybe?) return object with course and errors, indicate errors in browser
     res.send(onCalls);
   });

   module.exports = router;