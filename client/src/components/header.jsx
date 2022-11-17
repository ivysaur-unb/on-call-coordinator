import * as React from "react";
import Button from "@mui/material/Button";
import Dropdown from "./dropdown";
import "../page/homepage.css";
const Header = function () {
  const teacherLinks = [
    { name: "Dashboard", url: "/teacherDashboard" },
    { name: "Teacher", url: "/cvghjiop" },
  ];
  const adminLinks = [{ name: "Dashboard", url: "/adminDashboard" }];

  const profileLinks = [{ name: "Login", url: "/loginPage" }];

  return (
    <div className="header">
      <Dropdown dropdownlist={teacherLinks} root="Teachers">
        {" "}
      </Dropdown>
      <Dropdown dropdownlist={adminLinks} root="Office Administrator">
        {" "}
      </Dropdown>

      <Dropdown dropdownlist={profileLinks} root="Profile"></Dropdown>
    </div>
  );
};

export default Header;
