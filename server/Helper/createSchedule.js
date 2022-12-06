const prisma = require('../prismaClient');


async function createSchedule(schedule){
    let result = [];
    let errors = [];
    if(!schedule){
        errors.push({
            message: 'Invalid schedule.',
            data: schedule
        });
        return {result, errors};
    }

    //Find user & error check
    let findUser = await prisma.user.findFirst({
        where: {
            name: schedule.name,
            role: 'TEACHER'
        }
    })
    if(!findUser){
        errors.push({
            message: 'User not found',
            data: schedule.name
        });
        return {result, errors};
    }

    //finds teacher & error check
    let findTeacher = await prisma.teacher.findUnique({
        where: {
            userId: findUser.id
        }
    });
    if(!findTeacher){
        errors.push({
            message: 'Teacher not found',
            data: schedule.name
        });
        return {result, errors};
    }

    let findSchedule = await prisma.schedule.findUnique({
        where: {
            teacherId: findTeacher.id
        }
    });
    if(findSchedule){
        errors.push({
            message: 'Teacher already has a schedule',
            data: schedule.name
        });
        return {result, errors};
    }
    
    //Builds the data to create ScheduledClasses:
    let assembleScheduledClasses = [];
    let courseCodes = [];

    if(schedule.period1){ // if period1 is not undefined, create object for it
        let scheduledClassData = await formatScheduledClass(schedule.period1, schedule.period1Location, 1);
        //console.log(scheduledClassData);
        //error handling
        if(scheduledClassData.message){
            errors.push(scheduledClassData);
        }
        else{
            assembleScheduledClasses.push(scheduledClassData);
            if(scheduledClassData.class){
                courseCodes.push(scheduledClassData.class.connect.courseCode);
            }
        }
    }
    if(schedule.period2){
        let scheduledClassData = await formatScheduledClass(schedule.period2, schedule.period2Location, 2);
        //error handling
        if(scheduledClassData.message){
            errors.push(scheduledClassData);
        }
        else{
            assembleScheduledClasses.push(scheduledClassData);
            if(scheduledClassData.class){
                courseCodes.push(scheduledClassData.class.connect.courseCode);
            }
        }
    }
    if(schedule.period3){
        let scheduledClassData = await formatScheduledClass(schedule.period3, schedule.period3Location, 3);
        //error handling
        if(scheduledClassData.message){
            errors.push(scheduledClassData);
        }
        else{
            assembleScheduledClasses.push(scheduledClassData);
            if(scheduledClassData.class){
                courseCodes.push(scheduledClassData.class.connect.courseCode);
            }
        }
    }
    if(schedule.period4){
        let scheduledClassData = await formatScheduledClass(schedule.period4, schedule.period4Location, 4);
        //error handling
        if(scheduledClassData.message){
            errors.push(scheduledClassData);
        }
        else{
            assembleScheduledClasses.push(scheduledClassData);
            if(scheduledClassData.class){
                courseCodes.push(scheduledClassData.class.connect.courseCode);
            }
        }
    }
        
    //Create schedule
    result.push(await prisma.schedule.create({
        data:{
            teacher: {
                connect: {id: findTeacher.id}
            },
            classes: {
                create: assembleScheduledClasses
            }
        }
    }));

    //test print
    //console.log(createTeacherSchedule);
    //console.log(assembleScheduledClasses);
    return {result, courseCodes, errors};
    
}

async function formatScheduledClass(period, location, number){
    let sCode = specialCode(period);
    let periodData;
    let error;

    if(sCode){ //if it is a special code
        periodData = {
            period: number,
            specialCode: sCode
        };
    }
    else{ //if is just a normal course
        let course = await prisma.class.findUnique({
            where: {
                courseCode: period
            }
        });
        if(!course){
            error = {
                message: 'Class not found',
                data: 'class-code ' + period
            };
            //console.log(error);
            return error;
        }
        else{
            periodData = {
                period: number,
                location: location,
                class: {
                    connect: {
                        courseCode: course.courseCode
                    }
                }
            };
        }
    }
    return periodData;
}

function specialCode(period){
    if(period === 'M-1.00'){
        return 'MONITORING'
    }
    else if(period === 'S-1.00'){
        return 'RESOURCE_ROOM'
    }
    else if(period === 'L-1.00'){
        return 'LIBRARY'
    }
    else if(period === 'C-1.00'){
        return 'CHAPLAINCY'
    }
    else if(period === 'G-1.00'){
        return 'GUIDANCE'
    }
    else if(period === 'T-1.00'){
        return 'STUDENT_SUCCESS'   
    }
    else if(period === 'X'){
        return 'NOT_AVAILABLE'
    }
    return undefined;
}

module.exports.createSchedule = createSchedule;