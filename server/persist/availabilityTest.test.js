const getAvailability = require('../routes/getAvailability');


test ('get all teachers', async function () {

    let date = new Date ("2022-02-15");
    const teachers = await getAvailability.getAvailablePeriods(date);
    console.log(teachers);
}

)