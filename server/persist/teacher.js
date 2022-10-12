const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function createTeacherUser(teacher) {
    if (!teacher) return;
    if(teacher.user.name) {
        await prisma.teacher.create({
            data: {
                initials: teacher.initials,
                user: {
                    create: teacher.user
                }
            }
        })
    }
}
module.exports.createTeacherUser = createTeacherUser;