import "./principalDashboard.css"
import principalImage from "./images/businessman.png"
import { useState } from "react";
import { Box } from "@mui/system";
import VicePrincipalOnCall from "../components/VIcePrincipalOnCall";

function PrincipalDashboard({user}){
  const [displayImage, setImage] = useState(false);
    return (
    <>
    <div class="sidenav3">
    <h3><a href='/' onClick={() => setImage(false)}>HOME</a></h3>
    <a target="frame" href='/onCall' onClick={() => setImage(true)}>On Call</a>
    </div>
        
    <div class="main3">
      {!displayImage ? (<Box sx={{textAlign: "center"}}><img src= {principalImage} alt = "PrincipalImage"/><div>Welcome, {user ? user.name : "VP"}</div></Box>) : null}      
      <iframe name = "frame" title= "main body"></iframe>
    </div>
  </>
  );
}
export default PrincipalDashboard;