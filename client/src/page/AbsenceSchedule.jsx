import React, { useState, useEffect,useContext } from "react";
import AbsenceWeekView from "../components/AbsenceWeekView";
import WeekControl from "../components/WeekControl";
import { getWeekStart } from "../Helper/Date";
import TeacherAbsences from "./teacherAbsences";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { getAbsences } from "../backend-requests/teacherAbsences";
import {checkRole} from '../Helper/Auth';
import {UserContext} from '../App'
import { Stack } from '@mui/material';

export default function AbsenceSchedule() {
  //TODO OCT 26:
  // Make it not ugly
  // Styling and redoing period display
  // Handle date picker differently (or remove)
  // Investigate phantom absences?


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

  checkRole(useContext(UserContext).role,['ADMIN']);
  const [selectedFile, setSelectedFile] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [weekStart, setWeekStart] = useState(getWeekStart());

  useEffect(() => {
    let weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    getAbsences(weekStart, weekEnd).then(data => {
      setTeachers(data)
    })
  }, []);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (!event.target.files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("data", event.target.files[0]);
    fetch("/absences/import", {
      method: "POST",
      body: formData,
      
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.createResult.errors.length > 0) {
          //Display errors
          this.setState({ errors: data.createResult.errors });
        }
        if (data.teachers) {
          //Display Teachers
          let weekStart = this.minDate(data.teachers);
          setTeachers(data.teachers);
          setWeekStart(weekStart);
        }
      });
  };

  const onUpdateAbsences = (data) => {
    setTeachers(data.teachers);
    if(data.errors.length > 0) {
      console.log(data.errors);
    }
    setModalOpen(false);
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const handleClose = (e) => {
    setModalOpen(false);
  };
  
  return (
    <>
      <div className="absenceSchedule" style={{display:'flex', flexDirection:"column"}}>
        <h2 style={{textAlign: "center"}}>Absences</h2> 
        <WeekControl onChange={setWeekStart} />
        <AbsenceWeekView
          dateStart={weekStart}
          teachers={teachers}
          onTeacherChange={setSelectedTeacher}
          onClick={() => {setModalOpen(true);}}
        />
        <Stack direction={'row'} gap={'25px'}>
        <div>Legend:</div>
        <div>&#x25A0; = Absent</div>
        <div>&#x25A1; = Not Absent</div>        
        </Stack>  
      </div>
      <div className="absenceScheduleEdit">
        <Modal open={isModalOpen} onClose={handleClose}>
          <Box sx={{
            backgroundColor: "white",
            width: "50%",
            height: 650,
            margin: "auto",
            paddingTop: 3            
            }}>
            {selectedTeacher !== null ? (
              <TeacherAbsences
                teacher={selectedTeacher}
                weekStart={weekStart}
                onUpdateAbsences={onUpdateAbsences}
              />
            ) : null}
          </Box>
        </Modal>
      </div>
    </>
  );
}