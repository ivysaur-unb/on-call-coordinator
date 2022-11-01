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

  //const profileLinks = [{ name: "Login", url: "/loginPage" }];


  const logoutButton = <MenuItem><a href="/loginPage" onClick={()=>sessionStorage.setItem('token','')}>Log Out</a></MenuItem>

  return (
    <div className="header">
      <Dropdown dropdownlist={teacherLinks} root="Teachers" role={['ADMIN','TEACHER']}>
        {" "}
      </Dropdown>
      <Dropdown dropdownlist={teacherLinks} root="Office Administrator" role={['ADMIN']}>
        {" "}
      </Dropdown>

      <Dropdown dropdownlist={[]} root="Profile" role={['ANY']}>{logoutButton}</Dropdown>
    </div>
  );
};

export default Header;
