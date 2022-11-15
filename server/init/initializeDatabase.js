const { createTeacherUser } = require('../persist/teacher');
const { createSchool } = require('../persist/school');
const teachers = [
    {
        initials: "CF",
        user: {
            name: "Cameron Fiander",
            email: "camfiander@gmail.com",
            role: "TEACHER"
        }
    },
    {
        initials: "GT",
        user: {
            name: "Gian Tamayo",
            email: "gian@gmail.com",
            role: "TEACHER",
        }
    }
]

const schools = [
    {
        name: "Bayview High School",
        address: "3 Pacey Drive",
        numberOfStudents: 5,
        specialityPrograms: "smth"
    },
    {
        name: "Fredericton High School",
        address: "4444 Prospect Street",
        numberOfStudents: 100,
        specialityPrograms: "AP"
    }
]



async function initializeDatabase() {
    let errors = [];
    try {
        for (const school of schools) {
            await createSchool(school);
        }
    } catch (err) {
        console.log(err);
        errors.push(err);
    }
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
module.exports.initializeDatabase = initializeDatabase;

initializeDatabase();