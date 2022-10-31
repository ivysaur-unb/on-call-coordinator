import * as React from "react";
import Button from "@mui/material/Button";
import Dropdown from "./dropdown";
import "../page/homepage.css";
import { useContext } from "react";
import {UserContext} from '../App'


const Header = function () {
  const teacherLinks = [
    { name: "Teacher Absences", url: "/teacherAbsences", role:['ADMIN'] },
    { name: "Teacher", url: "/cvghjiop", role:['TEACHER','USER'] },
  ];

  const profileLinks = [{ name: "Login", url: "/loginPage" }];
  return (
    <div className="header">
      <Dropdown dropdownlist={teacherLinks} root="Teachers" role={['ADMIN','TEACHER']}>
        {" "}
      </Dropdown>
      <Dropdown dropdownlist={teacherLinks} root="Office Administrator" role={['ADMIN']}>
        {" "}
      </Dropdown>

      <Dropdown dropdownlist={profileLinks} root="Profile" role={['ANY']}></Dropdown>
    </div>
  );
};

export default Header;
