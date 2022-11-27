
import "./teacherDashboard.css";
import teacherImage from "./images/teacher.png"
import { useState } from "react";
import { Box } from "@mui/system";
import TeacherProfile from "./teacherProfilePage";
import TeacherSchedule from "./teacherSchedulePage";

function TeacherDashboard({user}){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <div className="sidenav">
      <h3><a href="/">HOME</a></h3>
    </div>
        
    <div className="main">
      {!displayImage ? (<Box sx={{textAlign: "center"}}>
                          <img src= {teacherImage} alt = "TeacherImage"/>
                          <div>Welcome, {user ? user.name : "TEACHER"}</div>
                          <TeacherProfile></TeacherProfile>
                        </Box>) : null}
      
    </div>
  </>
  );
}
export default TeacherDashboard;