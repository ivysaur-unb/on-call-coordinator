const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const XLSX = require("xlsx");
const { createAbsences } = require("../persist/absence");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const prisma = require('../prismaClient');

// /* GET users listing. */
// router.get("/", async function (req, res, next) {
//   const allMyUsers = await prisma.absence.findMany();
//   res.send(allMyUsers);
// });

router.post("/teacherAbsences", async function (req, res, next) {
  try {
    let teachers = await prisma.teacher.findMany({
      where: {
        id: { in: req.body.teacherId },
        // absences: {
          // some: {
          //   day: {
          //     lte: req.body.endDate,
          //     gte: req.body.startDate,
          //   },
          // },
        // },
      },
      select: {
        initials: true,
        absences: true,
        id: true,
        user: true
      },
    });
    res.send(teachers);
  } catch (e) {
    console.log(e);
    res.send(500, e)
  }
});

router.post("/import", upload.single("data"), async (req, res, next) => {
  let workbook = XLSX.read(req.file.buffer);
  //let workbook = XLSX.readFile("./Example Absences (Fall 2017-018).xlsx")
  let data = [];
  let headers = []; //saves the days and period headers
  const sheets = workbook.SheetNames;

  //maps a number to a day to be able to get the correct date.
  let dayNumMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
  };

  for (let i = 0; i < sheets.length; i++) {
    //for each sheet in the file
    const temp = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[i]]
    ); //turns sheet into JSON objects
    headers = temp[0]; //save headers here
    let d = new Date();
    let year = String(d.getFullYear()); //gets current year
    let month = sheets[i].slice(3, 5); //gets month from sheet name
    let mondayStart = parseInt(sheets[i].slice(6, 8)); //gets the starting date
    for (let j = 1; j < temp.length; j++) {
      //each object in the sheet
      let object = temp[j];
      var keys = Object.keys(object); //get name of keys
      let date = "";
      let day = 0;
      let period = 0;
      let initials = "";
      for (let k = 1; k < keys.length; k++) {
        //every element in the object
        let keyname = keys[k];
        initials = object[keys[0]]; //save initials of teacher

        period = parseInt(headers[keyname].slice(-1)); //save period
        let lastLetter = keyname.slice(-2); //retrieves the last character of the key
        let result = lastLetter.includes("_");
        let result2 = lastLetter.includes("a");
        if (result || result2) {
          lastLetter = lastLetter.slice(-1);
        }
        if (lastLetter == "y") {
          day = mondayStart + dayNumMap[keyname];
        } else {
          let num = parseInt(lastLetter);
          if (num <= 3 && num >= 1) {
            day = mondayStart;
          } else if (num <= 6 && num >= 4) {
            day = mondayStart + dayNumMap["Tuesday"];
          } else if (num <= 9 && num >= 7) {
            day = mondayStart + dayNumMap["Wednesday"];
          } else if (num <= 12 && num >= 10) {
            day = mondayStart + dayNumMap["Thursday"];
          } else {
            day = mondayStart + dayNumMap["Friday"];
          }
        }
        date = new Date(month.concat("/", day, "/", year)); //creates date object
        data.push({ initials: initials, day: date, period: period });
      }
    }
  }
  const createResult = await createAbsences(data);
  // Printing data
  console.log(createResult);
  const teachers = await prisma.teacher.findMany({
    include: {
      absences: true,
      user: true,
    },
  });

  res.send({ teachers, createResult });
});

router.post("/update", async (req, res, next) => {
  if (!req.body.teacherId || !req.body.weekStart) {
    res.status(400).send({ errors: [{ message: "invalid arguments" }] });
    return;
  }
  let errors = [];
  //Go get all absences for the teacher for that week
  let weekStart = req.body.weekStart;
  let weekEnd = new Date(weekStart);
  let reqAbsences = req.body.absences ? req.body.absences : [];

  weekEnd.setDate(weekEnd.getDate() + 7);
  let deleteResult;
  let createResult;
  let teachers;
  try {
    deleteResult = await prisma.absence.deleteMany({
      where: {
        AND: [
          { teacherId: req.body.teacherId },
          //Dates are within the week specified by weekstart
          { day: { gte: weekStart } },
          { day: { lte: weekEnd } },
        ],
      },
    });
    createResult = await prisma.absence.createMany({ data: reqAbsences });
    teachers = await prisma.teacher.findMany({
      include: {
        absences: true,
        user: true,
      },
    });
  } catch (err) {
    console.log(err);
    errors.push(err);
    res.status(500);
  }
  res.send({ teachers, createResult, deleteResult, errors });
});

module.exports = router;
