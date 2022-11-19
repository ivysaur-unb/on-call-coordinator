const prisma = require('../prismaClient');


async function createTeacherUser(teacher) {
    if (!teacher) return;
    if(teacher.user.name) {
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    create: teacher.user
                },
                school: {connect: {id: teacher.schoolId || 1}}
            }
        })
    }
}

module.exports.createTeacherUser = createTeacherUser;