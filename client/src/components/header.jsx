import * as React from "react";
import Button from "@mui/material/Button";
import Dropdown from "./dropdown";
import "../page/homepage.css";
import { useContext } from "react";

const Header = function () {
  const teacherLinks = [
    { name: "Teacher Absences", url: "/teacherAbsences", role:'ADMIN' },
    { name: "Teacher", url: "/cvghjiop", role:'ANY' },
  ];

  const profileLinks = [{ name: "Login", url: "/loginPage" }];
  return (
    <div className="header">
      <Dropdown dropdownlist={teacherLinks} root="Teachers">
        {" "}
      </Dropdown>
      <Dropdown dropdownlist={teacherLinks} root="Office Administrator">
        {" "}
      </Dropdown>

      <Dropdown dropdownlist={profileLinks} root="Profile"></Dropdown>
    </div>
  );
};

export default Header;
