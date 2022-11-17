const { createTeacherUser } = require("../persist/teacher");
const { createSchool } = require("../persist/school");
const { schools } = require("./schools");
const { classes } = require("./classes");
const { absences } = require("./absences");
const { teachers } = require("./teachers");
const prisma = require("../prismaClient");
const { createTeachables } = require('../Helper/createTeachables');
const { createClass } = require('../Helper/createClass');
const { teachables } = require('./teachables');

async function initializeSchools() {
  let errors = [];
  try {
    for (const school of schools) {
      await createSchool(school);
    }
  } catch (err) {
    console.log(err);
    errors.push(err);
  }
  return errors;
}

async function clearSchools() {
  await prisma.school.deleteMany({
    where: {
      name: { in: schools.map((x) => x.name) },
    },
  });
}

async function createAbsencesForTeacher(teacher) {
  await prisma.absence.createMany({
    data: absences.map((absence) => ({ ...absence, teacherId: teacher.id })),
  });
}

async function initializeTeachers() {
  let errors = [];
  const mySchools = await prisma.school.findMany({
    where: {
      name: { in: schools.map((x) => x.name) },
    },
    select: {
      id: true,
    },
  });

  try {
    for (const teach of teachers) {
      await createTeacherUser({
        ...teach,
        schoolId: mySchools[0].id
      });
      const createdTeacher = await prisma.teacher.findFirst({
        where: {
          initials: teach.initials,
          schoolId: mySchools[0].id
        },
        select: {
          id: true,
        },
      });
      await assignTeachablesForTeacher(createdTeacher);
      await createAbsencesForTeacher(createdTeacher);
      await createScheduleForTeacher(createdTeacher);
    }
  } catch (err) {
    console.log(err);
    errors.push(err);
  }
  return errors;
}

async function assignTeachablesForTeacher(teacher) {
  await prisma.teacher.update({
    where: {
      id: teacher.id
    },
    data: {
      teachable: {connect: [teachables[0], teachables[1]]}
    }
  })
  
}

async function createScheduleForTeacher(teacher) {
  const myClasses = await prisma.class.findMany({
    where: {
      courseCode: { in: classes.map((x) => x.courseCode) },
    },
  });
  await prisma.schedule.create({
    data: {
      teacherId: teacher.id,
      classes: {
        create: [
          { period: 0, classId: myClasses[0].id },
          {
            period: 1,
            specialCode: "MONITORING",
          },
          {
            period: 2,
            classId: myClasses[1].id,
          },
          {
            period: 3,
            specialCode: "LIBRARY",
          },
        ],
      },
    },
  });
}

async function clearTeachers() {
  // Clear schedule

  const teachersToClear = await prisma.teacher.findMany({
    where: {
      initials: { in: teachers.map((x) => x.initials) },
    },
    select: {
      id: true,
    },
  });
  for (const teacher of teachersToClear) {
    await clearSchedule(teacher);
    await clearAbsences(teacher);
    await prisma.teacher.delete({
      where: {
        id: teacher.id,
      },
    });
  }
}

async function clearAbsences(teacher) {
  await prisma.absence.deleteMany({
    where: {
      teacherId: teacher.id,
    },
  });
}

async function clearSchedule(teacher) {
  const teacherSchedule = await prisma.schedule.findUnique({
    where: {
      teacherId: teacher.id,
    },
    select: {
      id: true,
    },
  });
  // teacherSchedule.id may be null here
  await prisma.scheduledClass.deleteMany({
    where: {
      scheduleId: teacherSchedule.id,
    },
  });

  await prisma.schedule.delete({
    where: {
      id: teacherSchedule.id,
    },
  });
}

async function initializeClasses() {
  await prisma.class.createMany({
    data: classes,
  });
}

async function clearClasses() {
  await prisma.class.deleteMany({
    where: {
      courseCode: { in: classes.map((x) => x.courseCode) },
    },
  });
}

async function initializeDatabase() {
  try {
    await initializeSchools();
  } catch (e) {
    logInitError(e);
  }
  try {
    await createTeachables();
  } catch (e) {
    logInitError(e);
  }
  try {
    await initializeClasses();
  } catch (e) {
    logInitError(e);
  }
  try {
    await initializeTeachers();
  } catch (e) {
    logInitError(e);
  }
}

function logInitError(e) {
  console.log("Error during DB initialization, it's possible DB is already initialized?");
}

async function clearDatabase() {
  await clearTeachers();
  await clearClasses();
  await clearSchools();
}
module.exports = {
  initializeClasses,
  initializeSchools,
  initializeTeachers,
  clearSchools,
  clearClasses,
  clearTeachers,
  initializeDatabase,
  clearDatabase
};