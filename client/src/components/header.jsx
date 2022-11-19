import * as React from "react";
import Button from "@mui/material/Button";
import Dropdown from "./dropdown";
import "../page/homepage.css";
import { MenuItem } from "@mui/material";


const Header = function () {
  const teacherLinks = [
    { name: "Teacher Absences", url: "/teacherAbsences", role:['ADMIN'] },
    { name: "Teacher", url: "/cvghjiop", role:['TEACHER','USER'] },
  ];
  const adminLinks = [{ name: "Dashboard", url: "/adminDashboard" }];

  const logoutButton = <MenuItem><a href="/" onClick={()=>sessionStorage.setItem('token','')}>Log Out</a></MenuItem>

  return (
    <div className="header">
      
      <Dropdown dropdownlist={teacherLinks} root="Teachers" role={['ADMIN','TEACHER']} />
      <Dropdown dropdownlist={teacherLinks} root="Office Administrator" role={['ADMIN']}/>

      <Dropdown dropdownlist={[]} root="Profile" role={['TEACHER',"ADMIN",'USER','SUPPLY','VICE_PRINCIPAL']}>{logoutButton}</Dropdown>
    </div>
  );
};

export default Header;
