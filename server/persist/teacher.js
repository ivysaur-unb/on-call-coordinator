const prisma = require('../prismaClient');
const { createUser } = require('./users');

async function createTeacherUser(teacher) {
    if (!teacher) return;
    let findUser = await prisma.user.findUnique({
        where: {
            email: teacher.user.email,
        },
        select: {
            id: true,
            teacher: true,
        },
    });

    if (!findUser) {
        findUser = await createUser(
            teacher.user.name,
            teacher.user.email,
            teacher.user.password,
            'TEACHER'
        );
    }
    if (findUser && !findUser.teacher) {
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    connect: { id: findUser.id },
                },
                school: { connect: { id: teacher.schoolId || 1 } },
            },
        });
    }
}

module.exports.createTeacherUser = createTeacherUser;
