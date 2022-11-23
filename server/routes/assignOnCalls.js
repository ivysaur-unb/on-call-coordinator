const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//filters teachers based on the period
function filterUsingPeriods (course, listOfTeachers) {

    let period = course.period;
    let teachers = [];
    
    for (let temp in listOfTeachers) {

        if(listOfTeachers[temp].periods.indexOf(period) != -1){
            teachers.push(listOfTeachers[temp]);
        }
    }
    return teachers;
}

//filter the teachers using the teachables 
async function filterUsingTeachables (course, listOfTeachers) {

    const teachable = await prisma.Class.findFirst( {
        where: {
            id: course.classId
        },
        select: {
            teachable: true
        }
    });

    for (let x in listOfTeachers) {

        const temp = await prisma.Teacher.findFirst ({
            where: {
                id: listOfTeachers[x].teacherId
            },

            select: {
                teachable: true
            }
        });

        console.log(temp);
        listOfTeachers[x].teachable = temp;

    }
   
}

module.exports.filterUsingPeriods = filterUsingPeriods;
module.exports.filterUsingTeachables = filterUsingTeachables;

