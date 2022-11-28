import "./adminDashboard.css"
import adminImage from "./images/admin.png"
import { useState } from "react";
import AbsenceSchedule from './AbsenceSchedule';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadIcon from '@mui/icons-material/Upload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box } from "@mui/system";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material"

function AdminDashboard({user}) {
    const [displayImage, setImage] = useState(false);
    return (
        <>
        <ThemeProvider theme={theme}>
            <div class="sidenav2">
                <h3>DASHBOARD</h3>
                    <div class="absences">
                        <CalendarMonthIcon fontSize="large"></CalendarMonthIcon>
                        <a target = "frame" href='/importAbsences' onClick={() => setImage(true)}> Teacher Absences</a>
                    </div>
                    <div class="school">
                        <AddBusinessIcon fontSize="large"></AddBusinessIcon>
                        <a target = "frame" href='/board'  onClick={() => setImage(true)}>Create School</a>
                    </div>
                    <div class = "teacher">
                        <PersonAddIcon fontSize="large"></PersonAddIcon>
                        <a target = "frame" href='/addTeacher'  onClick={() => setImage(true)}>Add Teacher</a>
                    </div>
                    <div class = "class">
                        <UploadIcon fontSize="large"></UploadIcon>
                        <a target = "frame" href='/uploadClasses'  onClick={() => setImage(true)}>Upload Classes</a>
                    </div>
                    <div class = "schedule">
                        <AccessTimeIcon fontSize="large"></AccessTimeIcon>
                        <a target = "frame" href='/schoolSchedule'  onClick={() => setImage(true)}>School Schedule</a>
                    </div>
                    </div>

            <div class="main2">
            {!displayImage ? (<Box sx={{textAlign: "center"}}><img src={adminImage} alt="AdminImage"/><div>Welcome, {user ? user.name : "ADMIN"}</div></Box>) : null}
                <iframe name="frame" title="main body">
                </iframe>
            </div>
        </ThemeProvider>
        </>
    );
}
export default AdminDashboard;