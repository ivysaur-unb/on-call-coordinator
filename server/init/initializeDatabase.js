const { createTeacherUser } = require('../persist/teacher');
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
            role: "TEACHER"
        }
    }
]

async function initializeDatabase() {
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
module.exports.initializeDatabase = initializeDatabase;

initializeDatabase();