const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const { createTeachables } = require('../Helper/createTeachables');
const { createClass } = require('../Helper/createClass')
const { createTeacherUser } = require('../persist/teacher');
const { createSchool } = require('../persist/school');

const courses = [
    {
        coursecode: 'TIJ1O',
        coursetitle: 'Exploring Technologies',
        grade: 9,
        pathway: 'Open',
        teachable: 'Technological Education'
    },
    {
        coursecode: 'TGJ2O',
        coursetitle: 'Communications Technology',
        grade: 10,
        pathway: 'Open',
        teachable: 'Technological Education'
    },
    {
        coursecode: 'TGJ3M',
        coursetitle: 'Communications Technology',
        grade: 11,
        pathway: 'Open',
        teachable: 'Technological Education'
    }
];

const teachers = [
    {
        initials: "CF",
        user: {
            name: "Cameron Fiander",
            email: "camfiander@gmail.com",
            role: "TEACHER",
            password:'CFiander'
        }
    },
    {
        initials: "GT",
        user: {
            name: "Gian Tamayo",
            email: "gian@gmail.com",
            role: "TEACHER",
            password:'GTamayo'
        }
    }
];

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
];



async function initializeDatabase() {
    let errors = [];
    try {
        for (const school of schools) {
            await createSchool(school);
        }
        for (const teach of teachers) {
            await createTeacherUser(teach);
        }

        await createTeachables();
        for(const course of courses){
            await createClass(course);
        }
        let findSchool = await prisma.school.findFirst({
            where: {
                name: 'Test School'
            }
        });
        if(!findSchool){
            await prisma.school.create({
                data: {
                    name: 'Test School',
                    address: '123 Test Lane',
                    numberOfStudents: 70,
                    specialityPrograms: 'Hello World!'
                }
            })
        }
    }catch (err) {
        console.log(err);
        errors.push(err);
    }
    return errors;
}

module.exports.initializeDatabase = initializeDatabase;
initializeDatabase();