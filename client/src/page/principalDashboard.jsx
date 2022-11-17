import "./principalDashboard.css"
import principalImage from "./images/businessman.png"
import { useState } from "react";

function PrincipalDashboard(){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <div class="sidenav3">
    <h3><a href='/adminDashboard' onClick={() => setImage(false)}>HOME</a></h3>
    </div>
        
    <div class="main3">
      {!displayImage ? (<img src= {principalImage} alt = "PrincipalImage"/>) : null}
      <iframe name = "frame" title= "main body"></iframe>
    </div>
  </>
  );
}
export default PrincipalDashboard;