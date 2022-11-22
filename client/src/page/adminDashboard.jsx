import "./adminDashboard.css"
import adminImage from "./images/admin.png"
import { useState, useContext } from "react";
import AbsenceSchedule from './AbsenceSchedule';
import CreateSchoolForm from "../components/CreateSchoolForm";
import { Box } from "@mui/system";
import { UserContext } from '../App';
import { Stack } from '@mui/material';
import { TeacherProfile } from './TeacherProfile/TeacherProfile';
import UploadClasses from './UploadClasses/UploadClasses';
import SchoolSchedule from "./schoolSchedule";
function AdminDashboard({ }) {
    const user = useContext(UserContext);
    const [displayImage2, setImage] = useState(false);

    const displayImage = <Box sx={{ textAlign: "center" }}><img src={adminImage} alt="AdminImage" /><div>Welcome, {user.name} </div></Box>


    const [activePage, setActivePage] = useState(displayImage);
    return (
        <Stack direction={'row'} sx={{height:'100%'}}>
            <div class="sidenav2">
                <h3><a href='/' onClick={() => setActivePage(displayImage)}>HOME</a></h3>
                <ul>
                    <li onClick={() => setActivePage(<AbsenceSchedule />)}>Teacher Absences</li>
                    <li onClick={() => setActivePage(<CreateSchoolForm />)}>Create School</li>
                    <li  onClick={() => setActivePage(<TeacherProfile/>)}>Add Teacher</li>
                    <li onClick={() => setActivePage(<UploadClasses/>)}>Upload Courses</li>
                    <li  onClick={() => setActivePage(<SchoolSchedule/>)}>School Schedule</li>
                </ul>
            </div>

            <div class="main2">
                {activePage}
            </div>
        </Stack>
    );
}
export default AdminDashboard;