const request = require("supertest");
const app = require('../app');
const { createSchedule } = require('../Helper/createSchedule')
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');
const { tokenify } = require('../persist/auth');

beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
});

describe("Test get master schedules", () => {
    test("Get schedule", async () => {
        const response = await request(app).get("/schedules/getSchedules")
        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe("object");
        expect(typeof response.body[0].id).toBe("number");
    });
    });

test("Get schedule for teacher with scheduled classes", async () => {
    const token = tokenify({ name: "Cameron Fiander", email: "cfiande1@unb.ca", role: "TEACHER" });
    const response = await request(app).get("/schedules/teacher")
    .set("Authorization", token);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBeDefined();
});

test("Get schedule for undefined user", async () => {
    const token = tokenify({ name: "", email: "", role: "" });
    const response = await request(app).get("/schedules/teacher")
    .set("Authorization", token);
    
    expect(response.statusCode).toBe(400);
    expect(response.body.result).toBe(null);
    expect(response.body.error).toBeDefined();
});

test("Get schedule for user with no scheduled classes", async () => {
    const token = tokenify({ name: "Admin Test", email: "admin@unb.ca", role: "ADMIN" });
    const response = await request(app).get("/schedules/teacher")
    .set("Authorization", token);
    
    expect(response.statusCode).toBe(400);
    expect(response.body.result).toBe(null);
    expect(response.body.error).toBeDefined();
});