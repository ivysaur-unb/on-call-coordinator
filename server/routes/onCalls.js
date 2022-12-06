var express = require('express');
var router = express.Router();
const testOnCall = require('./assignOnCalls').testOnCall;
const getAvailability = require('../routes/getAvailability').getAvailablePeriods;
const getClassesToBeCovered = require('../routes/getClassesToBeCovered').getClassesToBeCovered;
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
                        location: true,
                        specialCode: true
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
            teacher:{
              user:{
                id: req.body.tId
              }
            } 
        },
        select: {
            id: true,
            day: true,
            scheduledClass: {
                select: {
                    class: true,
                    period: true,
                    location: true,
                    specialCode: true
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


   router.post('/create',async (req,res,next)=>{
    var date = new Date();
    const teachers = await getAvailability(date);
    const classes = await getClassesToBeCovered(date);
    let result = await testOnCall(date,teachers,classes);
    res.send(result);
})  
   module.exports = router;