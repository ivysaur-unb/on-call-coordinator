const { createTeacherUser } = require('../persist/teacher');
const { createSchool } = require('../persist/school');
const { schools } = require('./schools');
const { classes } = require('./classes');
const { absences } = require('./absences');
const { teachers } = require('./teachers');
const { prisma } = require('../prismaClient');
async function initializeSchools() {
    let errors = [];
    try {
        for (const school of schools) {
            await createSchool(school);
        }
    } catch (err) {
        console.log(err);
        errors.push(err);
    }

    return errors
}

async function clearSchools() {
    await prisma.school.deleteMany({
        where: {
            name: { in: schools.map(x => x.name)}
        }
    })
}

async function initializeTeachers() {
    let errors = [];
    try {
        for (const teach of teachers) {
            await createTeacherUser(teach);
        }
    } catch (err) {
        console.log(err);
        errors.push(err);
    }
    return errors;
}

async function clearTeachers() {
    await prisma.teacher.deleteMany({
        where: {
            initials: { in: teachers.map(x => x.initials)}
        }
    })
}

async function initializeSchedules() {
    // init from spreadsheet
}

async function initializeClasses() {
    // init from spreadsheet
}



async function initializeDatabase() {
    initializeSchools();
    initializeTeachers();

}
module.exports.initializeDatabase = initializeDatabase;

initializeDatabase();