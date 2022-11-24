const prisma = require("../prismaClient");

//this function already exist on another branch that hasn't been merged to main yet.
async function getAbsences(date) {
    const absences = await prisma.Absence.findMany( {
        where: {
            day: date
        },
        select: {
            id: true,
            day: true,
            period: true,
            teacher: {
                select: {
                    id: true,
                    schedule: true
                }
            }
        }
    });
    return absences;
}

// //gets the schedule id of the teachers that are absent on a particular day
// async function getScheduleId(date) {

//     const absences = await getAbsences(date);

//     for (let i = 0; i < absences.length; i++){

//         let id = await prisma.Schedule.findUnique ({
//             where: {
//                 teacherId: absences[i].teacherId
//             },
//             select: {
//                 id: true
//             }
//         })
//         absences[i].scheduleId = id.id;
//     }
//     return absences;
// }

//returns information about the class that needs to be covered: scheduleid, period, class id and location
async function getClassesToBeCovered (date) {

    const absences = await getAbsences(date);
    const classes = [];

    for (let i = 0; i < absences.length; i++){
       
        let id = await prisma.ScheduledClass.findFirst ({
            where: {
                scheduleId: absences[i].scheduleId,
                period: absences[i].period
            },
            select: {
                period:true,
                scheduleId: true,
                classId: true,
                location: true
            }
        })
        if(id!=null) {
            classes.push(id);
        }
    }
    return classes;
}

module.exports = { getAbsences, getScheduleId, getClassesToBeCovered };