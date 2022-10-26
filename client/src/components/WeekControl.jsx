import React, { useState, useEffect } from 'react';
import { getWeekStart } from '../Helper/Date';
import {IconButton} from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './weekControl.css';

function WeekControl(props) {
    const [weekStart, setWeekStart] = useState(getWeekStart())

    useEffect(() => {
        if(typeof props.onChange === 'function') {
            props.onChange(weekStart);
        }
    }, [props, weekStart])

    function incrementWeekStart(){
        let nextWeek = new Date(weekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setWeekStart(new Date(nextWeek));
    }

    function decrementWeekStart() {
        if(weekStart < Date.now()) {
            return;
        }
        let prevWeek = new Date(weekStart);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setWeekStart(prevWeek);
    }


    return (
    <div className='weekControl'>  
    <IconButton onClick={decrementWeekStart} > <ArrowCircleLeftIcon /> </IconButton>
        <p>
            {weekStart.toDateString()} - {new Date(new Date(weekStart).setDate(weekStart.getDate() + 4)).toDateString()}
        </p>
    <IconButton onClick={incrementWeekStart}> <ArrowCircleRightIcon /> </IconButton>
    </div>
    )

}

export default WeekControl;