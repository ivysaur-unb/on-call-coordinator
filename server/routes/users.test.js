const request = require("supertest");
const app = require("../app");
const { initializeDatabase, clearDatabase } = require("../init/initializeDatabase");

beforeAll(() => {
  return initializeDatabase();
})

afterAll(() => {
  return clearDatabase();
})

describe("Test login endpoint", () => {
  test("Valid login returns token", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ email: "cfiande1@unb.ca", password: "mytestpass1" });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.body.token).toBeDefined()
  });

  test("No password", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ email: "cfiande1@unb.ca" })
      expect(response.statusCode).toBe(401);      
  })
  test("Invalid user", async () => {
    const response = await request(app)
      .post("/auth")
      .send({ email: "notarealuser@unb.ca", password: "password" })
      expect(response.statusCode).toBe(401);       
  })
});

describe("Test get users endpoint", () => {
    test("It should response the GET method", async () => {
      const response = await request(app)
        .get("/users");
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe(
        "application/json; charset=utf-8"
      );
    //   expect(response.body.token).toBeDefined()
    });
  });
