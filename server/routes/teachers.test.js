const request = require("supertest");
const app = require('../app');
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');

beforeAll(() => {
    return initializeDatabase();
  });
  
afterAll(() => {
    return clearDatabase();
});

test("Get teachables for known teacher", async () => {
    const response = await request(app).get("/teachers/teachables")
    .send({email: 'cfiande1@unb.ca'});
    
    expect(response.statusCode).toBe(200);
    //expect(response.body.result).toBeDefined();
    expect(response.body.error).not.toBeDefined();
});

test("Get teachables for undefined user", async () => {
    const response = await request(app).get("/teachers/teachables")
    .send({email: ''});
    
    expect(response.statusCode).toBe(200);
    //expect(response.body.result).not.toBeDefined();
    expect(response.body.error).not.toBeDefined();
});

test("Get teachables for user with no teachables", async () => {
    const response = await request(app).get("/teachers/teachables")
    .send({email: 'vp@unb.ca'});
    
    expect(response.statusCode).toBe(200);
    //expect(response.body.result).not.toBeDefined();
    expect(response.body.error).toBeDefined();
});