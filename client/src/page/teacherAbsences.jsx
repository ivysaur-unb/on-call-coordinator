import React from 'react';
import { useState, useEffect } from 'react';
import Day from '../components/day';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function TeacherAbsences() {
    const week = []
    const days = ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday"]
    for (let i = 0; i <5; i++){
        week.push(<Day weekDay={days[i]}> </Day>)

    }

    function submitForms () {

        
        const checked = Array.from(document.querySelectorAll(".teacherAbsences-checkbox"))

        function isChecked(element) {
           
            const checkbox = element.querySelector("input")
            return (checkbox.checked)
        }

        const temp = checked.filter(isChecked)
        const id = document.querySelector("#teacher-id").value
        temp.map((element) => {
            const checkbox=element.querySelector("input")
            const dayperiod= checkbox.value.split("-")

            postAbsences(Number(id), Number(dayperiod[1]), dayperiod[0])
            
        }) 
        
        
    }
  return (

    <form >
    <div>
    {week}
    <TextField id="teacher-id" label="ID" variant="filled" />
    <Button onClick={submitForms} type="button" variant="outlined">Submit</Button>
    <Button type="reset" variant="outlined">Reset</Button>
   </div> 
   </form>
  )
}

function postAbsences(teacherId, period, day){

    const options = {
        method: 'POST',
        body: JSON.stringify ({
            teacherId: teacherId,
            day: day,
            period: period
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    fetch('/absences', options)
    
}

export default TeacherAbsences;
