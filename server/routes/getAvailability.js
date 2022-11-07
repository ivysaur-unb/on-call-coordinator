const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function getAllTeachers() {

    const allTeachers = await prisma.Teacher.findMany();
    return allTeachers;

}

async function getAllScheduledClass() {
    const allSchedule = await prisma.ScheduledClass.findMany();
    return allSchedule;
}

async function getScheduleIdAndPeriods () {

    const schedule = await getAllScheduledClass();
    const scheduleIdAndPeriods = {};

    for (let i = 0; i < schedule.length; i++){

        const temp = schedule[i];

        if (scheduleIdAndPeriods[temp.scheduleId]) {
            scheduleIdAndPeriods[temp.scheduleId].periods.push(temp.period);
        }

        else {
            scheduleIdAndPeriods[temp.scheduleId] = {scheduleId: temp.scheduleId, periods: [temp.period]}
        }
    }
    return scheduleIdAndPeriods;
}

async function editPeriods (arr){

    const periods = [1,2,3,4];
    const freePeriods = [];

    for (let i = 0; i < periods.length; i++){

        if (arr.indexOf(periods[i]) == -1) {
            freePeriods.push(periods[i])
        }
    }
    
    return freePeriods;
}


async function getFreePeriods () {

    const schedule = await getScheduleIdAndPeriods();

    for (let x in schedule){

       // console.log(x);
        const freePeriod = await editPeriods(schedule[x].periods);
        schedule[x].periods = freePeriod;

    }

    return schedule;

}


module.exports.getAllTeachers = getAllTeachers;
module.exports.getAllScheduledClass = getAllScheduledClass;
module.exports.getScheduleIdAndPeriods = getScheduleIdAndPeriods;
module.exports.getFreePeriods = getFreePeriods;