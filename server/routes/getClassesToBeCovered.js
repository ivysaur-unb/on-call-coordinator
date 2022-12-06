const prisma = require("../prismaClient");

//this function already exist on another branch that hasn't been merged to main yet.
async function getAbsences(date) {
    const minDate = new Date(date);
    minDate.setHours(0,0,0,0);
    const maxDate = new Date(date);
    maxDate.setHours(23,59,59,0);

    const absences = await prisma.Absence.findMany( {
        where: {
            AND: [
                {
                    day: { gte: minDate }
                },
                {
                    day: { lte: maxDate }
                }
            ]
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
async function getOnCalls (date) {

    const onCalls = await prisma.OnCall.findMany( {

        where: {

            day: date

        },

        select: {

            scheduledClassId: true

        }

    });

    return onCalls;

}
//returns information about the class that needs to be covered
async function getClassesToBeCovered (date) {

    const absences = await getAbsences(date);
    const onCalls = await getOnCalls(date);
    const classes = [];
    
    for (let i = 0; i < absences.length; i++){
       
        let id = await prisma.ScheduledClass.findFirst ({
            where: {
                scheduleId: absences[i].teacher.schedule.id,
                period: absences[i].period,
                NOT: {
                    id: {
                        in: onCalls.map((elem) => elem.scheduledClassId)
                    }
                }
            },
            select: {
                class : true,
                id:  true,
                specialCode: true, // Include specialCode for when class is null
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