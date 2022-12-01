const {PrismaClient} = require("@prisma/client");
const prisma = require("../prismaClient");

async function teacherToTeachables(name, courseCodes){
    let error = [];
    //Basic error handling
    if(!name){
        error.push({
            message: 'Cannot update teacher\'s teachables for undefined or empty name..',
            data: name
        });
    }
    if(!courseCodes || courseCodes.length === 0){
        error.push({
            message: 'Cannot update teacher\'s teachables with undefined course codes..',
            data: courseCodes
        });
    }
    if(error.length>0){
        return error;
    }
    
    //Grab the user ID
    let user = await prisma.user.findFirst({
        where:{
            name: name
        },
        select:{
            id: true
        }
    })

    //Grab the teachable IDs from inputted courseCodes
    let teachables = await prisma.class.findMany({
        where:{
            courseCode: {
                in: courseCodes
            }
        },
        select:{
            teachable:{
                select:{
                    id: true
                }
            }
        }
    });

    //Formats teachableIDs, probably not needed but it works rn
    let teachableIDs = [];
    for(let i = 0; i<teachables.length; i++){
        if(teachableIDs.indexOf(teachables[i].teachable.id) === -1){
            teachableIDs.push({id: teachables[i].teachable.id});
        }
    }

    //Finds the teacher's already assigned teachables
    let currentTeachables = await prisma.teacher.findMany({
        where:{
            user:{
                name: name
            },
            teachable:{
                every:{
                    id: {in: teachableIDs.map(c => (c.id))}
                }
            }
        },
        select:{
            teachable:{
                select:{
                    id: true
                }
            }
        }
    });

    //If there are already assigned teachables, filter them out of teachableIDs
    if(currentTeachables && currentTeachables.length > 0){
        for(let i = 0; i<currentTeachables[0].teachable.length; i++){
            teachableIDs = teachableIDs.filter(val => val.id !== currentTeachables[0].teachable[i].id)
        }
    }
    
    //If there are any new teachables for the teacher, update them
    if(teachableIDs.length > 0){
        let teacherTeachable = await prisma.user.update({
            where:{
                id: user.id,
            },
            select:{
                Teacher: true
            },
            data:{
                Teacher: {
                    update:{
                        teachable:{
                            connect:
                                teachableIDs.map(c => ({ id: c.id }))
                        }
                    }   
                }
            }
        });
    }    
}

module.exports.teacherToTeachables = teacherToTeachables;
