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
  const user = useContext(UserContext);
  checkRole(user.role,['ADMIN','TEACHER']);
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
        <div>A = Absent</div>
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