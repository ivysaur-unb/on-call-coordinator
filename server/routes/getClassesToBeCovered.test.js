const getClassesToBeCovered = require('./getClassesToBeCovered');


test('getAbsences', async function(){

    let date = new Date("2022-02-15");
    const absences = await getClassesToBeCovered.getAbsences(date);
    expect(absences.length).toBe(3);
})

test('get absences with schedule id', async function(){

    let date = new Date("2022-02-15");
    const absences = await getClassesToBeCovered.getScheduleId(date);
    expect(typeof(absences[0].scheduleId)).toBe('number');
})

test('get classes to be covered', async function(){

    let date = new Date("2022-02-15");
    const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
    //console.log(classes);
    expect(classes.length).toBe(1);
   
})

test('No classes required to be covered', async function(){

    let date = new Date("2022-02-17");
    const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
    expect(classes.length).toBe(0);
   
})



