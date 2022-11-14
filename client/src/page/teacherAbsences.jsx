import React from "react";
import { useState, useEffect } from "react";
import Day from "../components/day";
import Button from "@mui/material/Button";
import { updateAbsences } from "../backend-requests/teacherAbsences";
import { numberToDate, weekDayToNumber, getWeekStart } from "../Helper/Date";
function TeacherAbsences({teacher, weekStart, onUpdateAbsences}) {
  const week = [];
  // const [weekStart, setWeekStart] = useState(getWeekStart());
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const absencesForDay = (day) => {
    let date = new Date(day);
    return teacher.absences.filter(absence => date.toDateString() === new Date(absence.day).toDateString())
  }
  for (let i = 0; i < 5; i++) {
    let weekDate = new Date(weekStart);
    weekDate.setDate(weekDate.getDate() + i);
    let someAbsences = absencesForDay(weekDate);
    console.log({someAbsences})
    week.push(
      <Day weekDay={days[i]} disabled={weekDate < Date.now()} initialAbsences={absencesForDay(weekDate)}key={days[i]} />
    );
  }

  function submitForms() {
    const checked = Array.from(
      document.querySelectorAll(".teacherAbsences-checkbox")
    );

    if (!teacher || !teacher.id) return;
    const temp = checked.filter(
      (element) => element.querySelector("input").checked
    );
    let absences = [];
    temp.forEach((element) => {
      const checkbox = element.querySelector("input");
      const dayperiod = checkbox.value.split("-");

      let tempDate = new Date(weekStart);
      let dayOffset = weekDayToNumber(dayperiod[0]);
      tempDate.setDate(weekStart.getDate() + dayOffset - 1);
    
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
    })
      .then(response => response.json())
      .then(data => {
        console.log({data})
        if(typeof onUpdateAbsences === "function") {
          onUpdateAbsences(data);
        }
      });
  }

  return (
    <form>
      <div className="teacherAbsenceForm">
        {teacher.user ? (<h3>{teacher.user.name}</h3>) : null}
        {weekStart ? weekStart.toDateString() + " - " + new Date(new Date(weekStart).setDate(weekStart.getDate() + 4)).toDateString() : null}
        <div>{week}</div>

        <div className="teacherAbsences-button">
          <Button onClick={submitForms} type="button" variant="outlined">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default TeacherAbsences;
