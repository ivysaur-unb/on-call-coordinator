const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function createSchool(school) {
    if (!school) return;
    await prisma.school.create({
        data: school
    });
}

module.exports.createSchool = createSchool;