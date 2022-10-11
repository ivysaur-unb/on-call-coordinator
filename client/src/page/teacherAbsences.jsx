import React from 'react';
import { useState, useEffect } from 'react';
import Day from '../components/day';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { postAbsences} from '../backend-requests/teacherAbsences';

function TeacherAbsences() {
    const week = []
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
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
    <div className='teacherAbsenceForm'>
    <div>
    {week}
    </div>
    
    <TextField id="teacher-id" label="ID" variant="filled" />
    <div className='teacherAbsences-button'>
    <Button onClick={submitForms} type="button" variant="outlined">Submit</Button>
    </div>

    </div> 
   </form>
  )
}

export default TeacherAbsences;
