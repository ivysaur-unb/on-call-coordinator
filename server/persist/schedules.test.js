const request = require("supertest");
const app = require('../app');
const { createSchedule } = require('../Helper/createSchedule')
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');

beforeAll(() => {
    return initializeDatabase();
  });
  
afterAll(() => {
    return clearDatabase();
});

test('create schedule', async () => {
    let result = await createSchedule([{name: 'Colby Foster', period1: 'TIJ1O',period1Location: '1', period2: 'TGJ2O', period2Location: '2', period3: 'TGJ3M', period3Location: '3', period4: '', period14Location: ''}]);
    if(result.result == []){
        expect(result.errors).toBe([ { message: 'Teacher already has a schedule', data: undefined } ]);
    }
    else{
        expect(result.result).toBeDefined();
    }
});

test('Passing in bad arguments', async () => {
    expect(await createSchedule(null)).toEqual({"errors": [{"data": null, "message": "Invalid schedule."}], "result": []});
});

test("Get schedule for known teacher", async () => {
    const response = await request(app).get("/schedules/teacher")
    .send({email: 'cfiande1@unb.ca'});
    console.log(response.body);
    expect(response.body.result).toBeDefined();
    expect(response.body.error).not.toBeDefined();
});