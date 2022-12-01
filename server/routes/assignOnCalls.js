const prisma = require('../prismaClient');

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

    const newTeacherArray = [];
    let teachable = await prisma.Class.findFirst( {
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

        let temp = await prisma.Teacher.findFirst ({
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

//filter teacher based on number of on calls in a week and month 











module.exports.filterUsingPeriods = filterUsingPeriods;
module.exports.filterUsingTeachables = filterUsingTeachables;

