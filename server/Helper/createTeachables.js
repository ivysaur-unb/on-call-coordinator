const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

//creates all teachables in the array below
async function createTeachables(){
    teachables.forEach(element => {
        upload(element.label);
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


const teachables = [
    {label: 'Technological Education'},
    {label: 'The Arts'},
    {label: 'Guidance and Career Education'},
    {label: 'Social Sciences and Humanities'},
    {label: 'Canadian and World Studies'},
    {label: 'Business Studies'},
    {label: 'Classical Studies and International Languages'},
    {label: 'Computer Studies'},
    {label: 'American Sign Language as a Second Language'},
    {label: 'French as a Second Language'},
    {label: 'English'},
    {label: 'Science'},
    {label: 'Mathematics'},
    {label: 'First Nations, Metis, and Inuit Studies'},
    {label: 'Health and Physical Education'},
    {label: 'Native Languages'},
    {label: 'English as a Second Language and English Literacy Development'},
    {label: 'Interdisciplinary Studies'},
    {label: 'Cooperative Education'}
];

module.exports.createTeachables = createTeachables;