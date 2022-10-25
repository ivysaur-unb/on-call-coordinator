var express = require('express');
var router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const XLSX = require("xlsx");

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const {createTeacher} =  require('../helpers/createTeacher.js');
const {createTeachables} = require('../helpers/createTeachables.js');
const { createClass } = require('../helpers/createClass.js');

/* POST Schedules; stole this from cameron and gian, needs modifications*/
router.post('/', upload.single('data'), async (req, res, next) => {

  let workbook = XLSX.read(req.file.buffer);
  //let workbook = XLSX.readFile("./Example Absences (Fall 2017-018).xlsx")
  let data = []
  //let headers = [] //saves the days and period headers
  const sheets = workbook.SheetNames

  
    //Formats the data in the excel sheet to json objects
    //change i back to 0 after uploading courses ***************************************
    //i = 1 for creating course
    //i = 0 for creating schedules
  for (let i = 1; i < sheets.length; i++) { //for each sheet in the file
      const temp = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[i]])//turns sheet into JSON objects
    
      for (let j = 0; j < temp.length; j++) {//each object in the sheet
        let object = temp[j] //object stores each teacher's schedule
        var keys = Object.keys(object)//get name of keys
        /* for creating classes
        data.push({ "teachable": object['Teachable'], 
                "coursecode": object['Course Code'], 
                "coursetitle": object['Course Title'],
                "grade": object['Grade'],
                "pathway": object['Pathway']
        });
        */
        /* for creating schedules:
        data.push({ "name": object['Teacher Name'], 
                "period1": formatPeriod(object['Period 1']), "period1Location": object['__EMPTY'] === undefined? undefined: `${object['__EMPTY']}`, 
                "period2": formatPeriod(object['Period 2']), "period2Location": object['__EMPTY_1'] === undefined? undefined: `${object['__EMPTY_1']}`,
                "period3": formatPeriod(object['Period 3']), "period3Location": object['__EMPTY_2'] === undefined? undefined: `${object['__EMPTY_2']}`,
                "period4": formatPeriod(object['Period 4']), "period4Location": object['__EMPTY_3'] === undefined? undefined: `${object['__EMPTY_3']}`
        });
        */ 
       
        //createTeacher(object['Teacher Name']);
        //console.log(keys);
      } 
      
  }
  
  const createResult = 'Test';//await createAbsences(data);
  // Printing data for testing purposes
  //console.log(data[0]);
    
  
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
        if(period[1] === '-'){ // if period is special case, return it
            return period;
        }
        else{
            if(period[period.length-1] === '-'){ // will remove the "...-1" part of the course code (at the end)
                period = period.toString().slice(0, period.length-1);
            }
            else if(period[period.length-2] === '-'){ //will remove the "...-01" part of the code (at the end)
                period = period.toString().slice(0, period.length-2);
            }

            if(period[0] === 'V'){ // if the period is a combined class, return it
                return period;
            }
            period = period.toString().substring(0,5); //grabs first 5 chars of the course code, if it is a normal course
        }
    }
    return period;
}
  
  module.exports = router;