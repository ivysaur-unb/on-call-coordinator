const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function createAbsences(absences) {
    if (!absences) return {
        errors: [{message:"Invalid arguments"}]
    };
    
    let errors = [];

    // Make map of teachers by initals for finding ids
    const allTeachers = await prisma.teacher.findMany();
    let teachersByInitials = {};
    allTeachers.forEach(teach => {
        teachersByInitials[teach.initials] = teach;
    })

    let validAbsences = [];

    absences.forEach(absence => {
        if(teachersByInitials[absence.initals] === undefined) {
            errors.push({
                message: "Invalid teacher initials for absence",
                data: absence
            });
        } else {
            validAbsences.push({
                day: absence.day,
                period: absence.period,
                teacherId: teachersByInitials[absence.initals].id
            });
        }
    });

    let result = await prisma.absence.createMany({data: validAbsences});
    return {result, errors};
}

module.exports.createAbsences = createAbsences;