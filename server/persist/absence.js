const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


async function createAbsences(absences) {
    if (!absences) return {
        errors: [{message:"Invalid arguments"}]
    };
    
    let errors = [];

    // Make map of teachers by initals for finding ids
    let allTeachers = await prisma.teacher.findMany();

    let validAbsences = [];

    for (const absence of absences) {
        console.log(absence)
        const foundTeacher = allTeachers.find(x => x.initials === absence.initials)
        if(foundTeacher === undefined) {
            // errors.push({
            //     message: "Invalid teacher initials for absence",
            //     data: absence
            // });
            // If no teacher exists, create one
            let createTeacherData = 
                {
                    initials: absence.initials,
                    user: {
                        create: {
                            name: absence.initials,
                            // No way to set the real email, use placeholder
                            email: absence.initials,
                            role: "TEACHER",
                        }
                    }
                };
            
            let teacherResult;
            try {
                teacherResult = await prisma.teacher.create({ data: createTeacherData });
            } catch (err) {
                console.log(err);
                errors.push(err);
            }

            let createdTeacher = await prisma.teacher.findUnique({
                where: {
                    initials: absence.initials
                }
            });
            if(teacherResult !== undefined) {
                allTeachers.push(createdTeacher);
            }
            if(createdTeacher !== undefined) {
                validAbsences.push({
                    day: absence.date,
                    period: absence.period,
                    teacherId: createdTeacher.id
                });
            }
        } else {
            validAbsences.push({
                day: absence.date,
                period: absence.period,
                teacherId: foundTeacher.id
            });
        }
    }

    let result = await prisma.absence.createMany({data: validAbsences});
    return {result, errors};
}

module.exports.createAbsences = createAbsences;