const getClassesToBeCovered = require('../routes/getClassesToBeCovered');


test('getAbsences', async function(){

    let date = new Date("2022-02-15");
    const absences = await getClassesToBeCovered.getAbsences(date);
   // console.log(absences);
})

test('get absences with schedule id', async function(){

    let date = new Date("2022-02-15");
    const absences = await getClassesToBeCovered.getScheduleId(date);
    expect(typeof(absences[0].scheduleId)).toBe('number');
})

test('get classes to be covered', async function(){

    let date = new Date("2022-02-15");
    const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
    
    console.log(classes);
})

