import "./adminDashboard.css"
import adminImage from "./images/admin.png"
import { useState } from "react";
function AdminDashboard(){
const [displayImage, setImage] = useState(false);
    return (
    <>
        <div class="sidenav2">
        <h3>DASHBOARD</h3>
        <a target = "frame" href='/teacherAbsences' onClick={() => setImage(true)}>Teacher Absences</a>
        <a target = "frame" href='/board'  onClick={() => setImage(true)}>Create School</a>
        </div>
            
        <div class="main">
            {!displayImage ? (<img src= {adminImage} alt = "AdminImage"/>) : null}
            <iframe name = "frame" title = "main body"></iframe>
        </div>
    </>
  );
}
export default AdminDashboard;