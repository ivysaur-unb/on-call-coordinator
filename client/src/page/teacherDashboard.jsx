
import "./teacherDashboard.css";
import teacherImage from "./images/teacher.png"
import { useState } from "react";
import { Box } from "@mui/system";
import { useContext } from "react";
import { UserContext } from "../App";

function TeacherDashboard(){
  const user = useContext(UserContext);
  console.log(user);
  return (
    <>
    <div className="sidenav">
    <h3><a href="/">HOME</a></h3>
    </div>
        
    <div className="main">
      {(<Box sx={{textAlign: "center"}} ><img src= {(user && user.teacher && user.teacher.pictureUrl) ? user.teacher.pictureUrl : teacherImage} alt = "TeacherImage"/><div>Welcome, {user ? user.name : "TEACHER"}</div></Box>) }
      <iframe name = "frame" title= "main body"></iframe>
    </div>
  </>
  );
}
export default TeacherDashboard;