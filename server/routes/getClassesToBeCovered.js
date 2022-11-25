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

//returns information about the class that needs to be covered
async function getClassesToBeCovered (date) {

    const absences = await getAbsences(date);
    const classes = [];

    for (let i = 0; i < absences.length; i++){
       
        let id = await prisma.ScheduledClass.findFirst ({
            where: {
                scheduleId: absences[i].teacher.schedule.id,
                period: absences[i].period
            },
            select: {
                class : true,
                id:  true,
                period:true,
                schedule: true,
                location: true
            }
        })
        if(id!=null) {
            classes.push(id);
        }
    }
    return classes;
}

module.exports = { getAbsences, getClassesToBeCovered };