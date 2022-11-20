const prisma = require('../prismaClient');


async function createTeacherUser(teacher) {
    if (!teacher) return;
    const findUser = await prisma.user.findUnique({
        where: {
            email: teacher.user.email
        },
        select: {
            id: true,
            Teacher: true
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
    } else if (!findUser.Teacher) {
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    connect: { id: findUser.id }
                }
            },
        })
    }

}

module.exports.createTeacherUser = createTeacherUser;