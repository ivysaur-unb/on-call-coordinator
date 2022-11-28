
import "./teacherDashboard.css";
import teacherImage from "./images/teacher.png"
import { useState } from "react";
import { Box } from "@mui/system";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material"

function TeacherDashboard({user}){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <ThemeProvider theme={theme}>
    <div className="sidenav">
    <h3><a href="/">HOME</a></h3>
    </div>
        
    <div className="main">
      {!displayImage ? (<Box sx={{textAlign: "center"}}><img src= {teacherImage} alt = "TeacherImage"/><div>Welcome, {user ? user.name : "TEACHER"}</div></Box>) : null}
      <iframe name = "frame" title= "main body"></iframe>
    </div>
    </ThemeProvider>
  </>
  );
}
export default TeacherDashboard;