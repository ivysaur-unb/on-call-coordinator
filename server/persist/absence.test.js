const { createAbsences } = require('./absence')
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');
const app = require('../app');
const request = require("supertest");
beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
})

test('add absence', async () => {
    const absences = [{day: new Date(), period: 0, initials: "CF"}];
    const response = await request(app).post("/absences/update")
        .send({
            teacherId: 1,
            weekStart: new Date(),
            absences: absences
        });
    expect(response.statusCode).toBe(200);
    console.log(response.body);
    // let result = await createAbsences()
    // expect(result.result.count).toBe(1);
    // expect(result.errors.length).toBe(0);
})

test('Passing in bad arguments', async () => {
    expect(await createAbsences(null)).toEqual({errors: [{message:"Invalid arguments"}]})
})
  