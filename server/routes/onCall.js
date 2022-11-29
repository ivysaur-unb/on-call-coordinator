var express = require('express');
var router = express.Router();
const testOnCall = require('./assignOnCalls').testOnCall;
const getAvailability = require('../routes/getAvailability').getAvailablePeriods;
const getClassesToBeCovered = require('../routes/getClassesToBeCovered').getClassesToBeCovered;

router.post('/',async (req,res,next)=>{
   
    const teachers = await getAvailability(req.body.date);
    const classes = await getClassesToBeCovered(req.body.date);
    let result = await testOnCall(req.body.date);
    res.send(result);
})

module.exports = router;