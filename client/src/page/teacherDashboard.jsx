
import "./teacherDashboard.css"
import teacherImage from "./images/teacher.png"
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material"
import AbsenceSchedule from './AbsenceSchedule';
import { useState, useContext } from "react";
import { Box, Stack } from "@mui/system";
import { UserContext } from '../App';
import TeacherProfile from "./teacherProfilePage";
import VPViewOnCalls from "./TeacherViewOnCalls/TeacherViewOnCalls";
function TeacherDashboard({ }) {
  const user = useContext(UserContext);
  const displayImage = <Box sx={{ textAlign: "center" }}><img src={(user && user.teacher && user.teacher.pictureUrl) ? user.teacher.pictureUrl : teacherImage} alt="teacherImage" /><div>Welcome, {user.name} </div><TeacherProfile></TeacherProfile></Box>
  const [activePage, setActivePage] = useState(displayImage);

  const setActive = function (element) {
    return (e) => {
      let prev = document.querySelector('.dashboard-sidenav .active-tab');
      if (prev) {
        prev.className = '';
      }
      e.target.className = 'active-tab';
      setActivePage(element);
    }
  }

  return (
   <ThemeProvider theme={theme}>
    <Stack direction={'row'} sx={{ height: '100%' }}>
      <nav className="dashboard-sidenav">
        <h3><header className='active-tab' onClick={setActive(displayImage)}>HOME</header></h3>
        <ul>
          <li  onClick={setActive(<AbsenceSchedule/>)}>My Absences</li>
          <li  onClick={setActive(<VPViewOnCalls/>)}>Teacher On-Calls</li>
        </ul>
      </nav>

      <div className="dashboard-main">
        {activePage}
      </div>
    </Stack>
  </ThemeProvider>
  );
}

export default TeacherDashboard;