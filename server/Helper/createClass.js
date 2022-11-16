const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//take in a json object to create a class
async function createClass(classIn){

    let findClass = await prisma.class.findUnique({
        where: {
            courseCode: classIn.coursecode
        }
    })
    if(!findClass){
        await prisma.class.create({
            data: {
                courseCode: classIn.coursecode !== undefined? classIn.coursecode: '',
                title: classIn.coursetitle,
                grade: grade(classIn.grade),
                pathway: pathway(classIn.pathway),
                teachable: {
                    connect: {
                        id: (await prisma.teachable.findFirst({where: {name: classIn.teachable}})).id
                    }
                }
            }
        })
    } 
}

function grade(input){
    if(input === 9){
        return 'NINE';
    }
    else if(input === 10){
        return 'TEN';
    }
    else if(input === 11){
        return 'ELEVEN';
    }
    else if(input === 12){
        return 'TWELVE';
    }
    else if(input === 'Secondary'){
        return 'SECONDARY';
    }
    else if(input === 'Level 1'){
        return 'LEVEL_1';
    }
    else if(input === 'Level 2'){
        return 'LEVEL_2';
    }
    else if(input === 'Level 3'){
        return 'LEVEL_3';
    }
    else if(input === 'Level 4'){
        return 'LEVEL_4';
    }
    else if(input === 'Level 5'){
        return 'LEVEL_5';
    }
}

function pathway(input){
    if(input === 'Open'){
        return 'OPEN';
    }
    else if(input === 'Workplace Preparation'){
        return 'WORK_PREP';
    }
    else if(input === 'University/College Preparation' || input === 'College preparation' || input === 'College Preparation' || input === 'University preparation'){
        return 'WORK_PREP';
    }
    else if(input === 'Academic'){
        return 'ACADEMIC';
    }
    else if(input === 'Applied'){
        return 'APPLIED';
    }
    else if(input === 'De-streamed'){
        return 'DE_STREAMED';
    }
}
module.exports.createClass = createClass;