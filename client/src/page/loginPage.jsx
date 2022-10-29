import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../page/loginPage.css";
import { login,auth } from "../backend-requests/login";
import { Visibility,VisibilityOff  } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import {IconButton} from "@mui/material";

function Login() {
  const [error, setError] = React.useState(false);
  const [visiablePassword, setVisiablePassword]= React.useState(false);

  function submitLogin() {
    setError(false);
    const email = document.querySelector("#email-input-field");
    const passw = document.querySelector("#filled-password-input");
    if (email == null || passw == null) {
      return;
    }
    login(email.value, passw.value).then((response) => {
      if (response.ok) {
        response.json().then(async (response) => {
          sessionStorage.setItem("token", response.token);
          //window.location.href = 'https://checkboxrace.com/';
          window.location.href = '/';
        });
      } else {
        setError(true);
      }
    });
  }




  return (
    <form className="login">
      <div className="page-header">Login</div>
      <TextField
      fullWidth
        id="email-input-field"
        label="Email"
        autoComplete="current-password"
        error={error}
        helperText={error &&  (<div>Invalid Credentials</div>)}
      />
      <TextField
      fullWidth
        id="filled-password-input"
        label="Password"
        type={visiablePassword? 'text': 'password'}
        autoComplete="current-password"
        error={error}
        helperText={error &&  (<div>Invalid Credentials</div>)}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={()=>setVisiablePassword(!visiablePassword)}>{visiablePassword?<VisibilityOff/> :<Visibility/>} </IconButton>
          </InputAdornment>
        }}
       
      />

      <Button variant="contained" onClick={submitLogin}>
        Submit
      </Button>
    </form>
  );
}

export default Login;
