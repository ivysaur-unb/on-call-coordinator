const prisma = require("../prismaClient");

// Creates a school if one of the same name doesn't already exist
async function createSchool(school) {
  if (!school || !school.name) return;
  let findSchool = await prisma.school.findFirst({
    where: {
      name: school.name,
    },
  });
  if (!findSchool) {
    await prisma.school.create({
      data: school,
    });
  }
}

module.exports.createSchool = createSchool;
