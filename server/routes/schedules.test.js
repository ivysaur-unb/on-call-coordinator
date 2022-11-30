const request = require("supertest");
const app = require("../app");
const { initializeDatabase, clearDatabase } = require("../init/initializeDatabase");

beforeAll(() => {
    return initializeDatabase();
  })
  
afterAll(() => {
return clearDatabase();
})

describe("Test get master schedules", () => {
test("Get schedule", async () => {
    const response = await request(app).get("/schedules/getSchedules")
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(typeof response.body[0].id).toBe("number");
});
});