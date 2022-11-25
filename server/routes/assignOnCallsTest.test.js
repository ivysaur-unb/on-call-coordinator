const { JsonWebTokenError } = require('jsonwebtoken');

const filterUsingPeriods = require('./assignOnCalls').filterUsingPeriods;
const filterUsingTeachables = require('./assignOnCalls').filterUsingTeachables;
const getAvailability = require('../routes/getAvailability').getAvailablePeriods;
const getClassesToBeCovered = require('../routes/getClassesToBeCovered').getClassesToBeCovered;
const getMonthlyOnCalls =  require('../routes/assignOnCalls').getMonthlyOnCalls;

test ('filter using periods', async function () {
    jest.setTimeout(10000);
    let date = new Date ("2022-02-15");
    const teachers = await getAvailability(date);
    const classes = await getClassesToBeCovered(date);
    console.log('I AM HERE!!!!!')
    console.log(classes);
    const filterUsingPeriod = filterUsingPeriods(classes[0], teachers);
    console.log(teachers);
    const filteredTeachers = await filterUsingTeachables(classes[0], filterUsingPeriod);
    
   const temp = await getMonthlyOnCalls(date);
   console.log(temp);



})