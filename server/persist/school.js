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

async function getSchools() {
  const allMySchools = await prisma.school.findMany();
  return allMySchools
}

//this is the function used by the website on the create school page
async function postSchools(body) {
  let name = body.name;
  let address = body.address;
  let numberOfStudents = body.numberOfStudents;
  let specialityPrograms = body.specialityPrograms;

  if(!specialityPrograms || !name || !address || !numberOfStudents ){
    return 422;
  }
 //make sure you have all the parameters
  if(numberOfStudents < 0){
    return 422;
  }

  if(numberOfStudents > 1000000000){
    return 507;
  }

  let test = await prisma2.school.create({data:{
      name: body.name,
      address:body.address,
      numberOfStudents: body.numberOfStudents,
      specialityPrograms: body.specialityPrograms
  }})
  return test;
}

async function deleteSchools(body){
  let response = await prisma.school.delete({
    where:{
      id: body.id
    }
  })

  return response
}

module.exports.createSchool = createSchool;
module.exports.deleteSchools = deleteSchools;
module.exports.postSchools = postSchools;
module.exports.getSchools = getSchools;