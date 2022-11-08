const prisma = require('../prismaClient');


async function createSchool(school) {
    if (!school) return;
    await prisma.school.create({
        data: school
    });
}

module.exports.createSchool = createSchool;