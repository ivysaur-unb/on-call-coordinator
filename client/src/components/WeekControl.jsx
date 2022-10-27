import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import "./weekControl.css";
import { getWeekStart } from "../Helper/Date";
function WeekControl({onChange}) {
  const [weekStart, setWeekStart] = useState(getWeekStart());

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(weekStart);
    }
  }, [onChange, weekStart]);

  function incrementWeekStart() {
    let nextWeek = new Date(weekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeekStart(new Date(nextWeek));
  }

  function decrementWeekStart() {
    if (weekStart < Date.now()) {
      return;
    }
    let prevWeek = new Date(weekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeekStart(prevWeek);
  }

  const handleDateChange = (e) => {
    let weekDate = new Date(e.target.value);
    weekDate.setDate(weekDate.getDate() - weekDate.getDay() + 1)
    
    setWeekStart(weekDate)
  } 

  return (
    <div className="weekControl">
      <IconButton onClick={decrementWeekStart}>
        <ArrowCircleLeftIcon color={weekStart <= Date.now() ? "disabled" : "primary"}/>
      </IconButton>
      <label>
        {weekStart.toDateString()} -
        {new Date(
          new Date(weekStart).setDate(weekStart.getDate() + 4)
        ).toDateString()}
        <input type="date" value={weekStart.toISOString().split('T')[0]} onChange={handleDateChange}/>
      </label>
      <IconButton onClick={incrementWeekStart}>
        <ArrowCircleRightIcon color="primary"/>
      </IconButton>
    </div>
  );
}

export default WeekControl;

//Requirements:
// Display human-readable date format centered in the component
// {Monday {monday Date} - Friday {friday Date}}
// Arrows on either side of text increment/decrement week on click
// Option to disable going earlier than current week
// 'onWeekChange(Date)' function passed into component that can be called to update state of related components
