import React from 'react';
import { useState, useEffect } from 'react';
import Day from '../components/day';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'; 
import { postAbsences} from '../backend-requests/teacherAbsences';
import {numberToDate,weekDayToNumber} from '../Helper/Date';
function TeacherAbsences() {
    const week = []
    const [weekStart, setWeekStart] = useState(getWeekStart());
    let tempDateStart = new Date();
    tempDateStart.setDate(weekStart);
    
    const [dateStart, setDateStart] = useState(tempDateStart);

    let tempDateEnd = new Date();
    tempDateEnd.setDate(weekStart+6);
    const [dateEnd, setDateEnd] = useState(tempDateEnd);

    

    console.log(weekStart);
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

            let tempDate = new Date();
            let dayOffset = weekDayToNumber(dayperiod[0]);
            tempDate.setDate(weekStart+dayOffset);

            let date = (`${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`);

            postAbsences(Number(id), Number(dayperiod[1]), tempDate)
            
        }) 
        
        
    }


    function incrementWeekStartAndEnd(){
        let dTest = new Date();
        setWeekStart(weekStart + 7);

        dTest.setDate(weekStart+7);
        setDateStart(dTest);
        
        let eTest = new Date();
        eTest.setDate(weekStart+7+6);
        setDateEnd(eTest);
    }

    function decrementWeekStartAndEnd(){
        let dTest = new Date()
        
        setWeekStart(weekStart - 7);
        dTest.setDate(weekStart-7);
        setDateStart(dTest);
        
        let eTest = new Date();
        eTest.setDate(weekStart-7+6);
        setDateEnd(eTest);
    } 

  return (

    <form >
    <div className='teacherAbsenceForm'>
        <div className='teacherAbsence-date'>  
            <IconButton onClick={decrementWeekStartAndEnd} > <ArrowCircleLeftIcon /> </IconButton>
            <div>
                {dateStart.getDate()}
            </div>
            <div>
                {numberToDate(dateStart.getMonth())}
            </div>
            <div> 
                {dateEnd.getDate()}
            </div>
            <IconButton onClick={incrementWeekStartAndEnd} > <ArrowCircleRightIcon /> </IconButton>
        </div>
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



function getWeekStart(){
    let currentDay = new Date();
    let startOfWeek = currentDay.getDate() - currentDay.getDay();
    return startOfWeek;
}

function getWeekEnd(){
    let currentDay = new Date();
    let endOfWeek = currentDay.getDate() - currentDay.getDay() +6;
    return endOfWeek;
}

export default TeacherAbsences;
