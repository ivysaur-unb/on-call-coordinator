var express = require('express');
var router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const XLSX = require("xlsx");

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const { createTeacher } =  require('../Helper/createTeacher.js');
const { createSchedule } = require('../Helper/createSchedule.js');

/* POST Schedules; stole this from cameron and gian, needs modifications*/
router.post('/', upload.single('data'), async (req, res, next) => {
    
    let workbook = XLSX.read(req.file.buffer);
    //let workbook = XLSX.readFile("./Example Absences (Fall 2017-018).xlsx")
  
    let data = formatSchedule(workbook);
    let errors = [];
    let returnData = [];
    
    //Need to check if there are courses and teachables uploaded before submission


    //uploads schedules
    for(let k = 0; k<data.length; k++){
        
        errors.push(await createTeacher(data[k].name));

        let resultSchedule = await createSchedule(data[k]);
        if(resultSchedule.errors){ errors.push(resultSchedule.errors); }
        returnData.push()
    }
    
    //Print errors
    if(errors){
        console.log('Errors while uploading schedule:');
        let count = 1;
        for(let i = 0; i<errors.length; i++){
            if(errors[i]){
                for(let j = 0; j<errors[i].length; j++){
                console.log(`   Error#${count}: ${errors[i][j].message} for ${errors[i][j].data}`);
                count++;
                }
            }
        }
    }
    else{
        console.log('Successful upload')
    }
    
    //Builds json objects to send to front-end to display results
    //this is not good and I'm not sure if there is a better why to get the data
    let schedules = await prisma.schedule.findMany({
        select: {
            teacherId: true
        }
    });
    let userIds = [];
    for(let i = 0; i<schedules.length; i++){
        let userId = await prisma.teacher.findUnique({
            where: {
                id: schedules[i].teacherId
            },
            select: {
                userId: true
            }
        });
        if(userId){
            schedules[i].userId = userId.userId; //add userId to json object

            //get teacher name
            let userName = await prisma.user.findUnique({
                where: {
                    id: schedules[i].userId
                },
                select: {
                    name: true
                }
            });
            schedules[i].name = userName.name; //add name to json object

            //get teacher schedule
            let schedule = await prisma.schedule.findUnique({
                where: {
                    teacherId: schedules[i].teacherId
                },
                select: {
                    id: true
                }
            });
            schedules[i].scheduleId = schedule.id; //add scheduleId to json object

            //get scheduled classes
            let scheduledClasses = await prisma.scheduledClass.findMany({
                where: {
                    scheduleId: schedules[i].scheduleId
                },
                select: {
                    class: true,
                    specialCode: true,
                    period: true,
                    location: true
                }
            });
            //console.log(scheduledClasses); 
            let courses = [];
            for(let l = 0; l<scheduledClasses.length; l++){
                if(scheduledClasses[l]){
                    let temp = {};
                    if(scheduledClasses[l].class){
                        temp['code'] = scheduledClasses[l].class.courseCode;
                    }
                    else{
                        temp['code'] = scheduledClasses[l].specialCode;
                    }
                    temp['location'] = scheduledClasses[l].location? scheduledClasses[l].location: ''
                    temp['period'] = scheduledClasses[l].period
                    courses.push(temp);
                }
            }
            schedules[i].classes = courses;
            //console.log(schedules[i]);
            
        }
        //console.log(schedules);
    }


    res.send({errors, schedules});
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

const formatSchedule = (workbook) => {
    let data = []
    //let headers = [] //saves the days and period headers
    const sheets = workbook.SheetNames

    for (let i = 0; i < sheets.length; i++) { //for each sheet in the file
        const temp = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[i]])//turns sheet into JSON objects
      
        for (let j = 0; j < temp.length; j++) {//each object in the sheet
          let object = temp[j] //object stores each teacher's schedule
          var keys = Object.keys(object)//get name of keys
          // for creating classes
        //   if(object['Course Title'] === undefined){break;}

        //   data.push({ "teachable": object['Teachable'], 
        //           "coursecode": object['Course Code'], 
        //           "coursetitle": object['Course Title'],
        //           "grade": object['Grade'],
        //           "pathway": object['Pathway']
        //   });
        //   createClass(data[j]);
          
           //formatting  schedules:
          if(object['Teacher Name'] === undefined){ break; }
          data.push({ "name": object['Teacher Name'], 
                  "period1": formatPeriod(object['Period 1']), "period1Location": object['__EMPTY'] === undefined? undefined: `${object['__EMPTY']}`, 
                  "period2": formatPeriod(object['Period 2']), "period2Location": object['__EMPTY_1'] === undefined? undefined: `${object['__EMPTY_1']}`,
                  "period3": formatPeriod(object['Period 3']), "period3Location": object['__EMPTY_2'] === undefined? undefined: `${object['__EMPTY_2']}`,
                  "period4": formatPeriod(object['Period 4']), "period4Location": object['__EMPTY_3'] === undefined? undefined: `${object['__EMPTY_3']}`
          }); 
        } 
    }
    return data;
}
  
  module.exports = router;