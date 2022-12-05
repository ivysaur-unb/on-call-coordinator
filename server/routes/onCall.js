var express = require('express');
var router = express.Router();
const testOnCall = require('./assignOnCalls').testOnCall;
const getAvailability = require('../routes/getAvailability').getAvailablePeriods;
const getClassesToBeCovered = require('../routes/getClassesToBeCovered').getClassesToBeCovered;

router.post('/',async (req,res,next)=>{
    var date = new Date();
    //date = new Date(date.getFullYear(), date.getMonth(), date.getDay());
    const teachers = await getAvailability(date);
    const classes = await getClassesToBeCovered(date);
    let result = await testOnCall(date,teachers,classes);
    res.send(result);
    //res.send(500);
})  

module.exports = router;