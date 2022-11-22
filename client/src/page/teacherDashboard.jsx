
import "./dashboard.css";
import teacherImage from "./images/teacher.png"
import { useState, useContext } from "react";
import { Box, Stack } from "@mui/system";
import { UserContext } from '../App';
function TeacherDashboard({ }) {
  const user = useContext(UserContext);
  const displayImage = <Box sx={{ textAlign: "center" }}><img src={teacherImage} alt="teacherImage" /><div>Welcome, {user.name} </div></Box>
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
    <Stack direction={'row'} sx={{ height: '100%' }}>
      <nav className="dashboard-sidenav">
        <h3><header className='active-tab' onClick={setActive(displayImage)}>HOME</header></h3>
        <ul>
        </ul>
      </nav>

      <div className="dashboard-main">
        {activePage}
      </div>
    </Stack>

  );
}

export default TeacherDashboard;