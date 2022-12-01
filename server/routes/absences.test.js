const request = require("supertest");
const app = require("../app");
const { initializeDatabase, clearDatabase } = require("../init/initializeDatabase");
const { teachers } = require('../init/teachers')
const { tokenify } = require('../persist/auth');

beforeAll(() => {
  return initializeDatabase();
})

afterAll(() => {
  return clearDatabase();
})

describe("Test get teacher absences", () => {
  test("Get absences for known user", async () => {
    const token = tokenify({ name: "Admin Test", email: "admin@unb.ca", role: "ADMIN" });
    const response = await request(app).post("/absences/teacherAbsences")
    .set("Authorization", token)
    .send({teacherId: 1});
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
  });
});