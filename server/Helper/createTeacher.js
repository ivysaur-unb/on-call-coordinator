const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//creates a teacher from a name and assigns the teacher to pre-created school
async function createTeacher(teacherName){
    let errorTeacher = [];
    if(teacherName === undefined || teacherName === ''){ 
        errorTeacher.push({
            message: 'Cannot create teacher for undefined or empty name..',
            data: teacherName
        });
        return errorTeacher;
    }
        
    const findTeacher = await prisma.user.findFirst({
        where: {
            email: teacherName.replace(/ /g, "") + '@test.ca'
        }
    })
    if(findTeacher){
        errorTeacher.push({
        message: 'Teacher already exists with the specificed email..',
        data: findTeacher.email
        });
        return errorTeacher;
    }

    const teacherAndSchool = 
        {
            initials: getInitials(teacherName).toString(),
            user: {
                name: teacherName,
                email: teacherName.replace(/ /g, "") + '@test.ca',
                password: 'temp' + getInitials(teacherName).toString() + Math.floor(Math.random()*100),
                role: "TEACHER"
            }
        }
    await prisma.teacher.create({
        data: {
            initials: teacherAndSchool.initials,
            user: {
                create: teacherAndSchool.user
            },
            school: {
                connect: { //Needs to be updated to pull a shcool depending on what user is logged in
                    id: (await prisma.school.findFirst()).id
                }
            }
        }
    })
}

function getInitials(name){
    var names = name.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}
module.exports.createTeacher = createTeacher;