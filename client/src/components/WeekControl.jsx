import React from 'react';
import { useState, useEffect } from 'react';
import Day from '../components/day';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'; 
import {getAbsences} from '../backend-requests/teacherAbsences';
import {numberToDate,weekDayToNumber, getWeekStart} from '../Helper/Date';
import { flexbox } from '@mui/system';
import { renderMatches } from 'react-router-dom';

export function WeekControl(){
    const [weekStart, setWeekStart] = useState(getWeekStart());
    let currentWeekDateStart = new Date();
    currentWeekDateStart.setDate(getWeekStart());
    
    const [dateStart, setDateStart] = useState(currentWeekDateStart);

    let currentWeekDateEnd = new Date();
    currentWeekDateEnd.setDate(weekStart+6);
    const [dateEnd, setDateEnd] = useState(currentWeekDateEnd);

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
        if(weekStart - 7 < currentWeekDateStart.getDate()){
            console.log(`Weekstart: ${weekStart} Current: ${currentWeekDateStart.getDate()}`);
            return;
        }
        let dTest = new Date()
        
        setWeekStart(weekStart - 7);
        dTest.setDate(weekStart-7);
        setDateStart(dTest);
        
        let eTest = new Date();
        eTest.setDate(weekStart-7+6);
        setDateEnd(eTest);
    }

    
    const [absences, setAbsences] = useState([]);//saves teachers with their absences
    const [save, saveData] = useState([]);//saves filtered absences

    //getAbsences takes in an array of teacherIds, the starting and ending dates to find 
    //teachers who have absences during those date ranges.
    useEffect (() => {
        getAbsences([1,2],dateStart,dateEnd).then((data) => setAbsences(data))}, [dateEnd, dateStart]//calls getAbsences whenever dates change
    );
    useEffect(() => {saveData(saveAbsences(absences))}, [absences]);//filters absences whenever new teachers/absences are  retrieved.

    //Filters absences. 
    //Returns an array of arrays, each array belongs to a teacher 
    //which contains all their periods for a specific date. 
    function saveAbsences(absences){
        if(absences.length === 0){
            return [];
        }
        let tempArr = [];
        let string1 = 'Period: ';
        let string2 = 'Period: ';
        let string3 = 'Period: ';
        let string4 = 'Period: ';
        let string5 = 'Period: ';

        let nextDay = new Date(dateStart);
        let mon = new Date(nextDay);
        let tue = new Date(nextDay.setDate(nextDay.getDate() + 1));
        let wed = new Date(nextDay.setDate(nextDay.getDate() + 1));
        let thu = new Date(nextDay.setDate(nextDay.getDate() + 1));
        let fri = new Date(nextDay.setDate(nextDay.getDate() + 1));
        for(let i = 0; i < absences.length; i++){//each teacher in the array
            let item = absences[i].absences;
            for(let j = 0; j < item.length; j++){//each absent of a teacher
                let itemDate = new Date(item[j].day)
                if(itemDate.getDate() === mon.getDate()){
                    let str = ''+ item[j].period;
                    string1 = string1.concat(' '+ str);
                }
                if(itemDate.getDate() === tue.getDate()){
                    let str = ''+ item[j].period;
                    string2 = string2.concat(' '+ str);
                }
                if(itemDate.getDate() === wed.getDate()){
                    let str = '' + item[j].period;
                    string3 = string3.concat(' '+ str);
                }
                if(itemDate.getDate() === thu.getDate()){
                    let str = '' + item[j].period;
                    string4 = string4.concat(' '+ str);
                }
                if(itemDate.getDate() === fri.getDate()){
                    let str = ''+item[j].period;
                    string5 = string5.concat(' '+ str);
                }
            }
            tempArr.push([string1,string2,string3,string4,string5]); 
            string1 = "";
            string2 = "";
            string3 = "";
            string4 = "";
            string5 = "";
            string1 = 'Period: ';
            string2 = 'Period: ';
            string3 = 'Period: ';
            string4 = 'Period: ';
            string5 = 'Period: ';
        }
        return tempArr
    }
    return (
        <form style = {{display:"flex", alignItems: "center",justifycontent: "space-between", gap:"25px"}}>
            <div style = {{display:"flex", alignItems: "center",justifycontent: "space-between", gap:"25px"}} className='weekControl'>  
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
                 <h2 style = {{textAlign: "center"}}>Absence List</h2>
                 <br></br>
                 <div>
                        <table border = "2">
                            <thead>
                                <tr>
                                    <th>Teacher</th>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {absences ? absences.map((absent,index) => {
                                    if(save.length === 0){
                                        return null
                                    }
                                    else{
                                        return(
                                            <tr>
                                                <td>{absent.initials}</td>
                                                <td>{save[index][0]}</td>
                                                <td>{save[index][1]}</td>
                                                <td>{save[index][2]}</td>
                                                <td>{save[index][3]}</td>
                                                <td>{save[index][4]}</td>
                                                <td><Button>Edit</Button></td>
                                            </tr>   
                                        )
                                   }
                                }): null
                                }
                            </tbody>
                        </table>
                     </div>
               </div>
        </form>
    );
}

    //Requirements:
    // Display human-readable date format centered in the component
    // {Monday {monday Date} - Friday {friday Date}}
    // Arrows on either side of text increment/decrement week on click
    // Option to disable going earlier than current week
    // 'onWeekChange(Date)' function passed into component that can be called to update state of related components