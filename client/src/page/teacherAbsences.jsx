import React from "react";
import { useState, useEffect } from "react";
import Day from "../components/day";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  postAbsence,
  updateAbsences,
} from "../backend-requests/teacherAbsences";
import { numberToDate, weekDayToNumber, getWeekStart } from "../Helper/Date";
import WeekControl from "../components/WeekControl";
function TeacherAbsences() {
  const week = [];
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [teacher, setTeacher] = useState({});
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  for (let i = 0; i < 5; i++) {
    let weekDate = new Date(weekStart);
    weekDate.setDate(weekDate.getDate() + i);
    console.log({ weekDate });
    week.push(
      <Day weekDay={days[i]} disabled={weekDate < Date.now()}>
        {" "}
      </Day>
    );
  }

  function submitForms() {
    //TODO: Submit only one form
    // {teacherId: number,
    // weekStart: date
    //  absences : abence[] for the week}
    // on the back-end: delete old absences and create new ones
    const checked = Array.from(
      document.querySelectorAll(".teacherAbsences-checkbox")
    );

    // function isChecked(element) {

    //     const checkbox = element.querySelector("input")
    //     return (checkbox.checked)
    // }
    if (!teacher.id) return;
    const temp = checked.filter(
      (element) => element.querySelector("input").checked
    );
    let absences = [];
    temp.forEach((element) => {
      const checkbox = element.querySelector("input");
      const dayperiod = checkbox.value.split("-");

      let tempDate = new Date();
      let dayOffset = weekDayToNumber(dayperiod[0]);
      tempDate.setDate(weekStart + dayOffset);

      let date = `${tempDate.getFullYear()}-${tempDate.getMonth()}-${tempDate.getDate()}`;

      // postAbsence(Number(teacher.id), Number(dayperiod[1]), tempDate)
      absences.push({
        teacherId: teacher.id,
        period: Number(dayperiod[1]),
        day: tempDate,
      });
    });
    updateAbsences({
      teacherId: teacher.id,
      weekStart: weekStart,
      absences: absences,
    });
  }

  return (
    <form>
      <div className="teacherAbsenceForm">
        <WeekControl onChange={(week) => setWeekStart(week)} />
        <div>{week}</div>

        <TextField id="teacher-id" label="ID" variant="filled" />
        <div className="teacherAbsences-button">
          <Button onClick={submitForms} type="button" variant="outlined">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default TeacherAbsences;
