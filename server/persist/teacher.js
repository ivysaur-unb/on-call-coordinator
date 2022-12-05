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
    let schoolId
    if(!teacher.schoolId){
        schoolId = await prisma.school.findFirst({
            select:{
                id:true
            }
        });
     
    }
    if(!findUser) {
        let newUser = await createUser(teacher.user.name, teacher.user.email, teacher.user.password, teacher.user.role);
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    connect: { id: newUser.id },
                },
                school: {connect: {id: teacher.schoolId || schoolId.id}}
            }
        })
    } else if (!findUser.teacher) {
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
