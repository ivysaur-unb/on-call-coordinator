var express = require('express');
var router = express.Router();
const testOnCall = require('./assignOnCalls').testOnCall;


router.post('/',async (req,res,next)=>{
    console.log(req.body.date);
    let result = await testOnCall();
    res.send(result);
})

module.exports = router;