import "./adminDashboard.css"
import adminImage from "./images/admin.png"
import { useState } from "react";
import AbsenceSchedule from './AbsenceSchedule';
function AdminDashboard() {
    const [displayImage, setImage] = useState(false);
    return (
        <>
            <div class="sidenav2">
            <h3><a href='/adminDashboard' onClick={() => setImage(false)}>HOME</a></h3>
                <a target="frame" href='/importAbsences' onClick={() => setImage(true)}>Teacher Absences</a>
                <a target="frame" href='/board' onClick={() => setImage(true)}>Create School</a>
                <a target="frame" href='/addTeacher' onClick={() => setImage(true)}>Add Teacher</a>
                <a target="frame" href='/uploadClasses' onClick={() => setImage(true)}>Upload Courses</a>
                <a target="frame" href='/schoolSchedule' onClick={() => setImage(true)}>School Schedule</a>
            </div>

            <div class="main2">
                {!displayImage ? (<img src={adminImage} alt="AdminImage" />) : null}
                <iframe name="frame" title="main body">
                </iframe>
            </div>
        </>
    );
}
export default AdminDashboard;