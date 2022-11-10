const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//creates a teacher from a name and assigns the teacher to pre-created school
async function createTeacher(teacherName){
    if(teacherName !== undefined){
        let errorTeacher = [];
        const findTeacher = await prisma.user.findFirst({
            where: {
                email: teacherName + '@test.ca'
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
                    email: teacherName + '@test.ca',
                    role: "TEACHER"
                },
                school: {
                    name: 'Test School',
                    address: 'Test 123 Drive',
                    numberOfStudents: 70,
                    specialityPrograms: 'Why string?'
                }
            }
        await prisma.teacher.create({
            data: {
                initials: teacherAndSchool.initials,
                user: {
                    create: teacherAndSchool.user
                },
                school: {
                    connect: {
                        id: (await prisma.school.findFirst({where: {name:'Test School'}})).id
                    }
                }
            }
        })
    }
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