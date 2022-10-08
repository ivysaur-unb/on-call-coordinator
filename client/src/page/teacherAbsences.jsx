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
            console.log(checkbox.value.split("-"))
            console.log(id)
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

function postAbsences(){
    
}

export default TeacherAbsences;
