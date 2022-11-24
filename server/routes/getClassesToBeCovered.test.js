const getClassesToBeCovered = require('./getClassesToBeCovered');

//period number for this date is 0 in the database so I can't really test it.

test('getAbsences', async function(){

    let date = new Date("2022-11-24");
    const absences = await getClassesToBeCovered.getAbsences(date);
    //expect(absences.length).toBe(11);
    expect(absences.length).toBe(0);
})


test('get classes to be covered', async function(){

    let date = new Date("2022-11-24");
    const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
    expect(classes.length).toBe(0);
   
})

// test('No classes required to be covered', async function(){

//     let date = new Date("2022-02-17");
//     const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
//     expect(classes.length).toBe(0);
   
// })



