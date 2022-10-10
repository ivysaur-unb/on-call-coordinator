const express = require('express');
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const router = express.Router();
const XLSX = require("xlsx");
const {PrismaClient} = require("@prisma/client");

router.post('/import',upload.single('data'), (req, res, next) => {
    let workbook = XLSX.read(req.file.buffer);
    let data = []
    let headers = []
    const sheets = workbook.SheetNames

    for(let i = 0; i < sheets.length; i++){ //for each sheet in the file
        const temp = XLSX.utils.sheet_to_json(
             workbook.Sheets[workbook.SheetNames[i]])//turns sheet into JSON objects
        headers = temp[0]//save headers here
        console.log(headers)
        for(let j = 1;j<temp.length;j++) {//each object in the sheet
           let object = temp[j]
           var keys = Object.keys(object)//get name of keys
           let day = ""
           let period = 0
           let initials = ''
           for(let k = 1; k < keys.length; k++){//every element in the object
             let keyname = keys[k]
             
             initials = object[keys[0]]//save initials of teacher
         
             period = headers[keyname]//save period
             let lastLetter = keyname.slice(-1) 
             if(lastLetter == 'y'){
                 day = keyname
             }
             else{
                 let num = parseInt(lastLetter)
                 if(num <= 3 && num >= 1){
                     day = "Monday"
                 }
                 else if(num <= 6 && num >= 4){
                     day = "Tuesday"
                 }
                 else if(num <= 9 && num >= 7){
                     day = "Wednesday"
                 }
                 else if(num <= 12 && num >= 10){
                     day = "Thursday"
                 }
                 else{
                     day = "Friday"
                 }
             }
             data.push({"initials":initials,"day": day,"period":period})
             //TO DO: insert data into Absence table. Not sure if I can since there isnt Teacher table
             //or records yet.
           }
        }
     }
       
     // Printing data
    console.log(data)
    res.send(data)
})

module.exports = router;
