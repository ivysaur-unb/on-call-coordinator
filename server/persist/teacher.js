const prisma = require('../prismaClient');


async function createTeacherUser(teacher) {
    if (!teacher) return;
    const findUser = await prisma.user.findUnique({
        where: {
            email: teacher.user.email
        },
        select: {
            id: true,
            teacher: true
        }
    });

    if(!findUser) {
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    create: teacher.user
                },
                school: {connect: {id: teacher.schoolId || 1}}
            }
        })
    } else if (!findUser.teacher) {
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    connect: {id: findUser.id}
                },
                school: {connect: {id: teacher.schoolId || 1}}
            }
        })
    }
}

module.exports.createTeacherUser = createTeacherUser;