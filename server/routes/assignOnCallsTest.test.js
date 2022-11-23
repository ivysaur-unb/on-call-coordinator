const filterUsingPeriods = require('./assignOnCalls').filterUsingPeriods;
const filterUsingTeachables = require('./assignOnCalls').filterUsingTeachables;
const getAvailability = require('../routes/getAvailability').getAvailablePeriods;
const getClassesToBeCovered = require('../routes/getClassesToBeCovered').getClassesToBeCovered;


test ('filter using periods', async function () {

    let date = new Date ("2022-02-15");
    const teachers = await getAvailability(date);
    const classes = await getClassesToBeCovered(date);
    const filteredTeachers = await filterUsingTeachables(classes[0], teachers);
   // console.log(classes);
    //console.log(filterUsingPeriods(classes[0], teachers));
    console.log(filteredTeachers);


})