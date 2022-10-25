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

//class WeekControl extends React.Component {
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
    const test = [{initials: "AH", absences: [
        {period: 1, day: new Date(), teacherId: 1}//need to call getAbsences and work with response somehow
    ]}]
    //console.log(saveAbsences(test))
    const [absences, setAbsences] = useState([]);
    const [save, saveData] = useState([]);
    useEffect (() => {
        getAbsences([1,2],dateStart,dateEnd).then((data) => setAbsences(data))}, [dateEnd, dateStart]
    );
    //useEffect (() => {saveData(saveAbsences())}, []);
    function saveAbsences(absences){ //trying to filter the absences but currently not working
        if(absences.length === 0){
            return [];
        }
        let tempArr = [];
        let string1 = " ";
        let string2 = " ";
        let string3 = " ";
        let string4 = " ";
        let string5 = " ";

        let nextDay = dateStart;
        let mon = new Date(nextDay);
        let tue = new Date(nextDay.setDate(nextDay.getDate() + 1));
        let wed = new Date(nextDay.setDate(nextDay.getDate() + 1));
        let thu = new Date(nextDay.setDate(nextDay.getDate() + 1));
        let fri = new Date(nextDay.setDate(nextDay.getDate() + 1));
        for(let i = 0; i < absences.length; i++){//each teacher in the array
            let item = absences[i].absences;
            for(let j = 0; j < item.length; j++){//each absent of a teacher
                if(item[j].day.getDate() === mon.getDate()){
                    let str = item[j].period.toString();
                    string1.concat(str);
                }
                if(item[j].day.getDate() === tue.getDate()){
                    console.log(tue.getDate());
                console.log(item[j].day.getDate());
                    let str = item[j].period.toString();
                    console.log(str)
                    string2.concat(str);
                    console.log(string2)
                }
                if(item[j].day.getDate() === wed.getDate()){
                    let str = item[j].period.toString();
                    string3.concat(str);
                }
                if(item[j].day.getDate() === thu.getDate()){
                    let str = item[j].period.toString();
                    string4.concat(str);
                }
                if(item[j].day.getDate() === fri.getDate()){
                    let str = item[j].period.toString();
                    string5.concat(str);
                }
            }
            tempArr.push([string1,string2,string3,string4,string5]); 
            string1 = "";
            string2 = "";
            string3 = "";
            string4 = "";
            string5 = "";
        }
        console.log(tempArr)
        //return tempArr
    }
    return (
        <form>
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
                 <h2>Absence List</h2>
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
                                    return(
                                        <tr key = {index}>
                                        <tr>
                                             <td>{absent.initials}</td>
                                        </tr>
                                             {absent.absences.map((item,index) => {
                                                
                                                return (
                                                    <>
                                                    <td>{item.period}</td>
                                                    </>
                                                )
                                             })}
                                             <td><Button>Edit</Button></td>
                                        </tr>   
                                )})
                                    : null
                                }
                            </tbody>
                        </table>
                     </div>
               </div>
        </form>
    );
}
//}

    //Requirements:
    // Display human-readable date format centered in the component
    // {Monday {monday Date} - Friday {friday Date}}
    // Arrows on either side of text increment/decrement week on click
    // Option to disable going earlier than current week
    // 'onWeekChange(Date)' function passed into component that can be called to update state of related components