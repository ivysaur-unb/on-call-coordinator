const { createTeacherUser } = require('../persist/teacher');
const { createSchool } = require('../persist/school');
const { schools } = require('./schools');
const { classes } = require('./classes');
const { absences } = require('./absences');
const { teachers } = require('./teachers');

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