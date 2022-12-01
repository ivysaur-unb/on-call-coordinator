const request = require("supertest");
const app = require('../app');
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');
const { tokenify } = require('../persist/auth');

beforeAll(() => {
    return initializeDatabase();
  });
  
afterAll(() => {
    return clearDatabase();
});

test("Get teachables for known teacher", async () => {
    const token = tokenify({ name: "Cameron Fiander", email: "cfiande1@unb.ca", role: "TEACHER" });
    const response = await request(app).get("/teachers/teachables")
    .set("Authorization", token);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBeDefined();
    expect(response.body.error).not.toBeDefined();
});

test("Get teachables for undefined user", async () => {
    const token = tokenify({ name: "", email: "", role: "" });
    const response = await request(app).get("/teachers/teachables")
    .set("Authorization", token);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(null);
    expect(response.body.error).toBe("User not found");
});

test("Get teachables for user with no teachables", async () => {
    const token = tokenify({ name: "Admin Test", email: "admin@unb.ca", role: "ADMIN" });
    const response = await request(app).get("/teachers/teachables")
    .set("Authorization", token);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(null);
    expect(response.body.error).toBe("Teachables not found");
});