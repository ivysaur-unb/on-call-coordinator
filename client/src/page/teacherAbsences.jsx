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
  for (let i = 0; i < 5; i++) {
    let weekDate = new Date(weekStart);
    weekDate.setDate(weekDate.getDate() + i);
    week.push(
      <Day weekDay={days[i]} disabled={weekDate < Date.now()} key={days[i]} />
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
        if(typeof onUpdateAbsences === "function") {
          onUpdateAbsences(data);
        }
      });
  }

  return (
    <form>
      <div className="teacherAbsenceForm">
        {teacher.user ? (<h3>{teacher.user.name}</h3>) : null}
        <div>{week}</div>

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
