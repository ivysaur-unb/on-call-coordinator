const getClassesToBeCovered = require('./getClassesToBeCovered');
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');

//period number for this date is 0 in the database so I can't really test it.
beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
})

test('getAbsences', async function() {
    let date = new Date("2022-11-24T00:00:00");
    const absences = await getClassesToBeCovered.getAbsences(date);
    //expect(absences.length).toBe(11);
    expect(absences.length).toBe(0);
})


test('get classes to be covered', async function(){

    let date = new Date("2022-11-28T00:00:00");
    const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
    // Assuming absence data for this day matches init data
    expect(classes.length).toBe(9);
   
})

test('No classes required to be covered', async function() {
    let date = new Date("2022-11-24T00:00:00");
    const classes = await getClassesToBeCovered.getClassesToBeCovered(date);
    expect(classes.length).toBe(0);
});



