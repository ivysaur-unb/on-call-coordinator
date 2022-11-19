const prisma = require('../prismaClient');
const { teachables } = require('../init/teachables');
//creates all teachables in the array below
async function createTeachables(){
    teachables.forEach(element => {
        upload(element.name);
    });    
}
async function upload(teachable){
    let findTeachable = await prisma.teachable.findFirst({
        where: {
            name: teachable
        }
    });
    if(!findTeachable){
       await prisma.teachable.create({
            data: {
                name: teachable
            }
        });
    }
    
}

module.exports.createTeachables = createTeachables;