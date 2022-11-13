const { prisma } = require('@prisma/client');
const { createTeachables } = require('../Helper/createTeachables');

const school = {
    name: 'Test School',
    address: 'Test 123 Drive',
    numberOfStudents: 70,
    specialityPrograms: 'Why string?'
}

async function initializeDatabase() {
    let errors = [];
    try {
        await prisma.school.create({
            data: {
                name: school.name,
                address: school.address,
                numberOfStudents: 70,
                specialityPrograms: ' Why string?'
            }
        })
    } catch (err) {
        console.log(err);
        errors.push(err);
    }
    return errors;
}
module.exports.initializeDatabase = initializeDatabase;