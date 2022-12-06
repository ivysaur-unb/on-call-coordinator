const getAvailability = require('../routes/getAvailability').getAvailablePeriods;
const getClassesToBeCovered = require('../routes/getClassesToBeCovered').getClassesToBeCovered;
const prisma = require('../prismaClient');

//filters teachers based on the period
function filterUsingPeriods(course, listOfTeachers) {

    let period = course.period;
    let teachers = [];

    for (let temp in listOfTeachers) {

        if (listOfTeachers[temp].periods.indexOf(period) != -1) {
            teachers.push(listOfTeachers[temp]);
        }
    }
    return teachers;
}

//filter the teachers using the teachables 
async function filterUsingTeachables(course, listOfTeachers) {

    const newTeacherArray = [];
    let teachable = await prisma.Class.findFirst({
        where: {
            id: course.classId
        },
        select: {
            teachable: true
        }
    });
    //teachable of course : {}
    teachable = teachable.teachable;

    //get teachables of all the teacher in the list: [ {}, {},...]
    for (let x of listOfTeachers) {

        let temp = await prisma.Teacher.findFirst({
            where: {
                id: x.teacherId
            },
            select: {
                teachable: true
            }
        });
        //temp = array of teachable objects
        temp = temp.teachable;

        //loop through all the teachable in temp
        for (let y of temp) {

            //if we found the teachable we are looking for in the array
            if (y.id === teachable.id) {
                //add the teacher to the new array
                newTeacherArray.push(x);
            }
        }

    }
    return newTeacherArray;
}

//get list of on calls by month
async function getMonthlyOnCalls(date, listOfTeachers) {

    //get a new date that is the same month and year as 'date' 
    var start = new Date(date.getFullYear(), date.getMonth(), 0);
    //get the next month
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //get a list of teacher id
    let teacherIdArray = listOfTeachers.map(({ teacherId }) => teacherId);

    //returns an array of onCall obj for the filtered teachers for the given month
    let temp = await prisma.OnCall.findMany({
        where: {
            day: {
                lt: end,
                gte: start
            },

            teacherId: {
                in: teacherIdArray
            }
        }
    })

    return countOnCalls(teacherIdArray, temp, date);

}

function getWeekStart(date) {

    let d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    return d;
}

function getWeekEnd(date) {

    let d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
    return d;
}

//Counts each teachers weekly and monthly oncalls
function countOnCalls(listOfTeacherId, onCalls, date) {

    let teachers = {};
    let start = getWeekStart(date);
    let end = getWeekEnd(date);
    let teacherMin = 4;
    let teacherId = null;

    for (let x of listOfTeacherId) {
        teachers[x] = {
            month: 0,
            week: 0
        }
    }

    for (let y of onCalls) {

        if (y.date >= start && y.date <= end) {
            teachers[y.teacherId].week = teachers[y.teacherId].week + 1;
        }

        teachers[y.teacherId].month = teachers[y.teacherId].month + 1;
    }

    for (let z in teachers) {

        if (teachers[z].week < 2) {


            if (teachers[z].month < teacherMin) {

                teacherMin = teachers[z].month;
                teacherId = z;
            }
        }
    }
    return teacherId;
}


const testOnCall = async function (date, teachers, classes) {

    const uncoveredClasses = [];

    let i = 0;
    for (i = 0; i < classes.length; i++) {

        //filtering
        const filterUsingPeriod = filterUsingPeriods(classes[i], teachers);
        const filteredTeachers = await filterUsingTeachables(classes[i], filterUsingPeriod);
        const temp = await getMonthlyOnCalls(date, filteredTeachers)

        //if we did not find any teacher to cover this class
        if (temp == null) {
            uncoveredClasses.push(classes[i]);
        }

        else {
            //creating
            try {
                await prisma.OnCall.create({
                    data: {
                        teacherId: Number(temp),
                        scheduledClassId: classes[i].id,
                        day: date
                    }
                })
                //cleaning up
                for (let x in teachers) {

                    if (Number(temp) === teachers[x].teacherId) {
                        teachers[x].periods.splice(teachers[x].periods.indexOf(classes[i].period), 1);
                    }
                }
            }
            catch(e){
                //caught when trying to create a onCall for class that is already taught
            }
        }


    }

    return uncoveredClasses;
}

module.exports.filterUsingPeriods = filterUsingPeriods;
module.exports.filterUsingTeachables = filterUsingTeachables;
module.exports.getMonthlyOnCalls = getMonthlyOnCalls;
module.exports.testOnCall = testOnCall;

