
import "./teacherDashboard.css";
import teacherImage from "./images/teacher.png"
import { useState } from "react";
import { Box } from "@mui/system";

function TeacherDashboard({user}){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <div className="sidenav">
    <h3><a href="/">HOME</a></h3>
      <a target="frame" href='/onCallsTeacher' onClick={() => setImage(true)}>My On-Calls</a>
    </div>
        
    <div className="main">
      {!displayImage ? (<Box sx={{textAlign: "center"}}><img src= {teacherImage} alt = "TeacherImage"/><div>Welcome, {user ? user.name : "TEACHER"}</div></Box>) : null}
      <iframe name = "frame" title= "main body"></iframe>
    </div>
  </>
  );
}
export default TeacherDashboard;