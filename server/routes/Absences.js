var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const XLSX = require("xlsx");
const {createAbsences} = require("../persist/absence");

const { PrismaClient } = require('@prisma/client')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const prisma = new PrismaClient()
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const allMyUsers = await prisma.absence.findMany()
  res.send(allMyUsers)
});

router.post('/', async function(req,res,next){
 
   let tester = await prisma.absence.create({data:{    
    teacherId: req.body.teacher,
    day: req.body.day,
    period: req.body.period

  }});
 
  res.send(tester);
})

router.post('/import', upload.single('data'), async (req, res, next) => {
  let workbook = XLSX.read(req.file.buffer);
  //let workbook = XLSX.readFile("./Example Absences (Fall 2017-018).xlsx")
  let data = []
  let headers = [] //saves the days and period headers
  const sheets = workbook.SheetNames

  //maps a number to a day to be able to get the correct date.
  let dayNumMap = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4 }

  for (let i = 0; i < sheets.length; i++) { //for each sheet in the file
      const temp = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[i]])//turns sheet into JSON objects
      headers = temp[0]//save headers here
      let d = new Date()
      let year = String(d.getFullYear()) //gets current year
      let month = sheets[i].slice(3, 5) //gets month from sheet name
      let mondayStart = parseInt(sheets[i].slice(6, 8)) //gets the starting date
      for (let j = 1; j < temp.length; j++) {//each object in the sheet
          let object = temp[j]
          var keys = Object.keys(object)//get name of keys
          let date = ""
          let day = 0
          let period = 0
          let initials = ''
          for (let k = 1; k < keys.length; k++) {//every element in the object
              let keyname = keys[k]
              initials = object[keys[0]]//save initials of teacher

              period = parseInt(headers[keyname].slice(-1))//save period
              let lastLetter = keyname.slice(-2) //retrieves the last character of the key
              let result = lastLetter.includes("_")
              let result2 = lastLetter.includes("a")
              if (result || result2) {
                  lastLetter = lastLetter.slice(-1)
              }
              if (lastLetter == 'y') {
                  day = mondayStart + dayNumMap[keyname]
              }
              else {
                  let num = parseInt(lastLetter)
                  if (num <= 3 && num >= 1) {
                      day = mondayStart
                  }
                  else if (num <= 6 && num >= 4) {
                      day = mondayStart + dayNumMap["Tuesday"]
                  }
                  else if (num <= 9 && num >= 7) {
                      day = mondayStart + dayNumMap["Wednesday"]
                  }
                  else if (num <= 12 && num >= 10) {
                      day = mondayStart + dayNumMap["Thursday"]
                  }
                  else {
                      day = mondayStart + dayNumMap["Friday"]
                  }
              }
              date = new Date(month.concat("/", day, "/", year))//creates date object
              data.push({ "initials": initials, "date": date, "period": period })
          }
      }
  }
  const createResult = await createAbsences(data);
  // Printing data
  console.log(createResult)
  const teachers = await prisma.teacher.findMany({
      include: {
          Absence: true,
          user: true
      }
  });

  res.send({ teachers, createResult });
})

module.exports = router;
