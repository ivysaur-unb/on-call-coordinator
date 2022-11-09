const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//gets all the teachers from the Teacher table
async function getAllTeachers() {

    const allTeachers = await prisma.Teacher.findMany();
    return allTeachers;

}

//gets all the schedule from Schedule table
async function getAllSchedule(){
    const allSchedule = await prisma.Schedule.findMany();
    return allSchedule;
}

//gets all the schedule from the ScheduledClass table
async function getAllScheduledClass() {
    const allSchedule = await prisma.ScheduledClass.findMany();
    return allSchedule;
}

//gets all the absences from the absence table
async function getAbsences() {
    const absences = await prisma.Absence.findMany();
    return absences;
}

//returns single schedule id with all the periods associated with it
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

//helper method to return only the free periods 
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

//returns all the scheduleid and free periods for each teacher
async function getFreePeriods () {

    const schedule = await getScheduleIdAndPeriods();

    for (let x in schedule){

        const freePeriod = await editPeriods(schedule[x].periods);
        schedule[x].periods = freePeriod;

    }

    return schedule;

}

async function getFreePeriodsWithTeacherId() {

    const schedule = await getAllSchedule();
    const freePeriods = await getFreePeriods();

    for(let x in freePeriods) {

        let teacherId = schedule.find(t => t.id === freePeriods[x].scheduleId);
        freePeriods[x].teacherId = teacherId.teacherId;
    }

    return freePeriods;
}

function removeAbsences(periodToBeRemoved) {

    return this != periodToBeRemoved;
}
//incorporate the data from absence table to edit free periods for each teacher
async function getAvailablePeriods() {

    const absences = await getAbsences();
    const freePeriods = await getFreePeriodsWithTeacherId();
    
    for (let i = 0; i < absences.length; i++) {

        const temp = absences[i];
        let temp2;

        for (x in freePeriods) {
            if (freePeriods[x].teacherId === temp.teacherId) {
                temp2 = freePeriods[x];

                if (temp2.periods.indexOf(temp.period) != -1) {
                    temp2.periods = temp2.periods.filter(removeAbsences, temp.period);
                }
            }
        }    
    }

    return freePeriods;
}


module.exports.getAllTeachers = getAllTeachers;
module.exports.getAllScheduledClass = getAllScheduledClass;
module.exports.getScheduleIdAndPeriods = getScheduleIdAndPeriods;
module.exports.getFreePeriods = getFreePeriods;
module.exports.getAbsences = getAbsences;
module.exports.getAllSchedule = getAllSchedule;
module.exports.getFreePeriodsWithTeacherId = getFreePeriodsWithTeacherId;
module.exports.getAvailablePeriods = getAvailablePeriods;
module.exports.removeAbsences = removeAbsences;