const getAvailability = require('../routes/getAvailability');


test ('get all teachers', async function () {

    const teachers = await getAvailability.getFreePeriods();
    console.log(teachers);
}

)