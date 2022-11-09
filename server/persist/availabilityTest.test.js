const getAvailability = require('../routes/getAvailability');


test ('get all teachers', async function () {

    const teachers = await getAvailability.getAvailablePeriods();
    console.log(teachers);
}

)