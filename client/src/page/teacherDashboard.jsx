
import "./teacherDashboard.css";
import teacherImage from "./images/teacher.png"
import { useState } from "react";

function TeacherDashboard(){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <div class="sidenav">
    <h3>DASHBOARD</h3>
    </div>
        
    <div class="main">
      {!displayImage ? (<img src= {teacherImage} alt = "TeacherImage"/>) : null}
      <iframe name = "frame" title= "main body"></iframe>
    </div>
  </>
  );
}
export default TeacherDashboard;