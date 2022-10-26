import React, { useState, useEffect } from 'react';
import AbsenceWeekView from '../components/AbsenceWeekView';
import WeekControl from '../components/WeekControl';
import { getWeekStart } from '../Helper/Date';
import TeacherAbsences from './teacherAbsences';
export default function AbsenceSchedule() {

    // IVYSAUR-53 required changes:
    //  Include WeekControl
    //  Teacher table should update on change to current week
    //  Should automatically load current week's absences from DB on component mount
    //  Filterable (e.g. by teacher name):
    //      Search bar to the left of teacher table
    //      autocomplete suggestions as possible quality-of-life improvement, but depends on effort required
    //  Each teacher needs an edit ('✏') button:
    //      Edit button opens teacherAbsences component
    //      Controls for setting absences should only be enabled for future periods
    //      After saving changes to teacherAbsences table is updated to match
    //  Separate OA and Teacher functionality:
    //      For OA: All teachers can be edited 
    //      For teacher: View is restricted to their own absences

  const [selectedFile, setSelectedFile] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [weekStart, setWeekStart] = useState(getWeekStart());

  const onFileChange = event => {
    setSelectedFile(event.target.files[0])
    if (!event.target.files[0]) {return;}

    const formData = new FormData()
    formData.append("data", event.target.files[0])
    fetch('/absences/import', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if(data.createResult.errors.length > 0) {
          //Display errors
          this.setState({ errors: data.createResult.errors });
        }
        if(data.teachers) {
          //Display Teachers
          let weekStart = this.minDate(data.teachers);
          setTeachers(data.teachers);
          setWeekStart(weekStart);
        }
      });
  }

    return (
      <>
        <div className="absenceSchedule">
          <WeekControl onChange={setWeekStart}/>
          <AbsenceWeekView dateStart={weekStart} onTeacherChange={(teach) => {
            console.log(teach);
            setSelectedTeacher(teach);
          }}/>
        </div>
        <div className="absenceScheduleEdit">
          {selectedTeacher !== null ? (<TeacherAbsences teacher={selectedTeacher} weekStart={weekStart} />) : null}
        </div>
      </>
    );
  
}
function minDate(teachers) {
  console.log({teach: teachers[0]})
  let min = teachers[0].absences[0].day
  for(let teach of teachers) {
    let minForTeach = teach.absences.sort((a,b)=>a.day-b.day)[0];
    if(minForTeach < min) {
      min = minForTeach;
    }
  }
  let result = new Date(min);
  if(result.getDay() !== 1) {
    result.setDate(result.getDate() + (1 - result.getDay()))
  }
  return result;
}
