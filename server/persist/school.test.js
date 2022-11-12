const {
  getSchools,
  postSchools,
  deleteSchools,
  post,
} = require("../routes/schools");
const request = require("supertest");
const app = require("../app");
const testSchoolName = "asdgmnktbkbnthvmhkfgnf";

test("add school", async function () {
  const options = {
    name: testSchoolName,
    address: "address",
    numberOfStudents: 15,
    specialityPrograms: "Math",
  };

  const response = await request(app).post("/schools")
  .send(options);
  expect(response.statusCode).toBe(200)

  let postResponse = await postSchools(options);
  //on success the postSchools will return an object, otherwise it will return an error code (number)
  expect(typeof postResponse).toBe("object");

  let getRepsonse = await getSchools();

  getRepsonse = getRepsonse.filter((school) => {
    return school.name === testSchoolName;
  });

  expect(getRepsonse.length).toBe(1);

  const deleteOption = {
    id: getRepsonse[0].id,
  };

  let cleanUp = await deleteSchools(deleteOption);
  expect(cleanUp.name).toBe(testSchoolName);
});
