var express = require('express');
var router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const XLSX = require("xlsx");

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/* POST Schedules; stole this from cameron and gian, needs modifications*/
router.post('/', upload.single('data'), async (req, res, next) => {

  let workbook = XLSX.read(req.file.buffer);
  //let workbook = XLSX.readFile("./Example Absences (Fall 2017-018).xlsx")
  let data = []
  //let headers = [] //saves the days and period headers
  const sheets = workbook.SheetNames

  //maps a number to a day to be able to get the correct date.
  let dayNumMap = { "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4 }

  for (let i = 0; i < sheets.length; i++) { //for each sheet in the file
      const temp = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[i]])//turns sheet into JSON objects
      //headers = temp[0]//This does not save the header for me, it just grabs the first row of add I actually need to read
    
      for (let j = 0; j < temp.length; j++) {//each object in the sheet
        let object = temp[j] //object stores each teacher's schedule
        //console.log(object);
        var keys = Object.keys(object)//get name of keys
        //console.log(keys);

        data.push({ "name": object['Teacher Name'], 
                "period1": formatPeriod(object['Period 1']), "period1Location": object['__EMPTY'], 
                "period2": formatPeriod(object['Period 2']), "period2Location": object['__EMPTY_1'],
                "period3": formatPeriod(object['Period 3']), "period3Location": object['__EMPTY_2'],
                "period4": formatPeriod(object['Period 4']), "period4Location": object['__EMPTY_3']
            });
      } 
  }
  
  const createResult = 'Test';//await createAbsences(data);
  // Printing data for testing purposes
  console.log(data[3]);
  //console.log(headers);
  const teachers = await prisma.teacher.findMany({
      include: {
          absences: true,
          user: true
      }
  });

  res.send({ teachers, createResult });
})

//Helper Function to Format the Period Course Code
const formatPeriod = (period) =>{
    if(period !== undefined){
        if(period[1] === '-'){ 
            return period;
        }
        else{
            period = period.toString().replace(/V/, ''); //Removes the V at the start of course code (special case)
            period = period.toString().substring(0,5); //grabs first 5 chars of the course code
        }
    }
    return period;
}
  
  module.exports = router;