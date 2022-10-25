const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function createCourse(course) {
    if (!course) return;
    if(course.courseCode) {
        await prisma.teacher.create({
            data: {
                teachable: req.body.teachable,
                courseCode: req.body.courseCode,
                title: req.body.title,
                grade: req.body.grade,
                pathway: req.body.pathway,
            }
        })
    }
}

module.exports.createCourse = createCourse;