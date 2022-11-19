// const { createAbsences } = require('./absence')
// const { initializeDatabase } = require('../init/initializeDatabase');

// beforeAll(() => {
//     return initializeDatabase();
// });

// test('add absence', async () => {
//     let result = await createAbsences([{day: new Date(), period: 0, initials: "CF"}])
//     expect(result.result.count).toBe(1);
//     expect(result.errors.length).toBe(0);
// })

// test('Passing in bad arguments', async () => {
//     expect(await createAbsences(null)).toEqual({errors: [{message:"Invalid arguments"}]})
// })

const getClassesToBeCovered = require('../routes/getClassesToBeCovered');
test('getAbsences', async function(){

    let date = new Date("2022-02-15");
    const absences = await getClassesToBeCovered.getAbsences(date);
   // console.log(absences);
})

  