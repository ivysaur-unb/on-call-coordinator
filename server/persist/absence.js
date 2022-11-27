const prisma = require('../prismaClient');



async function createAbsences(absences) {
    if (!absences) return {
        errors: [{message:"Invalid arguments"}]
    };
    
    let errors = [];

    // Make map of teachers by initals for finding ids
    let allTeachers = await prisma.teacher.findMany();

    let validAbsences = [];

    for (const absence of absences) {
        const foundTeacher = allTeachers.find(x => x.initials === absence.initials)
        if(foundTeacher === undefined) {
            errors.push({
                message: "Invalid teacher initials for absence",
                data: absence
            });
            // This could be improved by giving the OA an option to generate new users when
            // there is no valid teacher in the system. Not a high priority because we
            // don't plan on maintaining the spreadsheet functionality
        } else {
            validAbsences.push({
                day: absence.day,
                period: absence.period,
                teacherId: foundTeacher.id
            });
        }
    }

    let result = await prisma.absence.createMany({data: validAbsences});
    return {result, errors};
}

module.exports.createAbsences = createAbsences;