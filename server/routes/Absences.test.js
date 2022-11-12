const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).post("/absences/teacherAbsences")
    .send({teacherId: 0});
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
  });
});