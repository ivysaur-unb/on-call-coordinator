const { createAbsences } = require('./absence')
const { initializeDatabase, clearDatabase } = require('../init/initializeDatabase');
const app = require('../app');
const request = require("supertest");
const { teachers } = require('../init/teachers');
const prisma = require('../prismaClient');
const { tokenify } = require('./auth');
beforeAll(() => {
    return initializeDatabase();
});

afterAll(() => {
    return clearDatabase();
})

test('add absence', async () => {
    const myTeacher = await prisma.teacher.findFirst({
        // where: {
            // initials: teachers[0].initials
        // },
        select: {
            id: true
        }
    });
    const absences = [{day: new Date(), period: 0, teacherId: myTeacher.id }];
    const token = tokenify({ name: "Admin Test", email: "admin@unb.ca", role: "ADMIN" });
    const response = await request(app).post("/absences/update")
    .set("Authorization", token)
        .send({
            teacherId: myTeacher.id,
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
  