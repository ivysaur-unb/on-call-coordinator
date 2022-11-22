import "./dashboard.css"
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
    const displayImage = <Box sx={{ textAlign: "center" }}><img src={adminImage} alt="AdminImage" /><div>Welcome, {user.name} </div></Box>
    const [activePage, setActivePage] = useState(displayImage);
    
    const setActive = function(element){
        return (e)=>{
            let prev = document.querySelector('.dashboard-sidenav .active-tab');
            if(prev){
                prev.className = '';
            }
            e.target.className = 'active-tab';
            setActivePage(element);
        }
    }
    return (
        <Stack direction={'row'} sx={{height:'100%'}}>
            <nav className="dashboard-sidenav">
                <h3><header className='active-tab' onClick={() => setActivePage(displayImage)}>HOME</header></h3>
                <ul>
                    <li  onClick={setActive(<AbsenceSchedule/>)}>Teacher Absences</li>
                    <li onClick={setActive(<CreateSchoolForm />)}>Create School</li>
                    <li onClick={setActive(<TeacherProfile/>)}>Add Teacher</li>
                    <li onClick={setActive(<UploadClasses/>)}>Upload Courses</li>
                    <li onClick={setActive(<SchoolSchedule/>)}>School Schedule</li>
                </ul>
            </nav>

            <div className="dashboard-main">
                {activePage}
            </div>
        </Stack>
    );
}
export default AdminDashboard;