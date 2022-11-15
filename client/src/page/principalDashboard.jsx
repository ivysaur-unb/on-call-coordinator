import "./principalDashboard.css"
import principalImage from "./images/businessman.png"
import { useState } from "react";

function PrincipalDashboard(){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <div class="sidenav3">
    <h3>DASHBOARD</h3>
    <a target = "absences" href='/teacherAbsences' onClick={() => setImage(true)}>Teacher Absences</a>
    </div>
        
    <div class="main">
      {!displayImage ? (<img src= {principalImage} alt = "PrincipalImage"/>) : null}
      <iframe name = "absences" title= "main body"></iframe>
    </div>
  </>
  );
}
export default PrincipalDashboard;