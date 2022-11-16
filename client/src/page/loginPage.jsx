import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../page/loginPage.css";
import { login } from "../backend-requests/login";

function Login() {
  function testFunction() {
    const email = document.querySelector("#email-input-field");
    const passw = document.querySelector("#filled-password-input");
    if (email == null || passw == null) {
      return;
    }
    login(email.value, passw.value).then((response) => {
      if (response.ok) {
        response.json().then((response) => {
          sessionStorage.setItem("token", response.token);
          window.alert("Login Successful!");
        });
      } else {
        window.alert("Invalid Credentials!");
      }
    });
  }
  return (
    <form className="login">
      <div className="page-header">Login</div>
      <TextField
        id="email-input-field"
        label="Email"
        autoComplete="current-password"
      />
      <TextField
        id="filled-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />

      <Button variant="contained" onClick={testFunction}>
        Submit
      </Button>
    </form>
  );
}

export default Login;
