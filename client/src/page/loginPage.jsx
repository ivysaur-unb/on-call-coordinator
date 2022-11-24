 import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../page/loginPage.css";
import { login, auth } from "../backend-requests/login";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton,Stack, InputAdornment } from "@mui/material";

function Login() {
  const [error, setError] = React.useState(false);
  const [visiablePassword, setVisiablePassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  function submitLogin(e) {
    e.preventDefault();
    setError(false);
    setErrorMessage(null);
    const email = document.querySelector("#email-input-field");
    const passw = document.querySelector("#filled-password-input");
    if (email == null || passw == null) {
      return;
    }
    login(email.value, passw.value).then((response) => {
      if (response.ok) {
        response.json().then(async (response) => {
          sessionStorage.setItem("token", response.token);
          window.location.href = '/';
        });
      } else {
        switch (response.status) {
          case 401: setErrorMessage('Invalid Credentials'); break;
          case 500: setErrorMessage('Dev Environment Error')
        }
        setError(true);
      }
    });
  }




  return (
    <form className="login" onSubmit={submitLogin}>
      <Stack direction='row' spacing={4}>
        <div className="page-header">iSchedule</div>
        <div className="image-container">
         <img src="https://i.ibb.co/QXwJq66/image-modified-1.png" alt="image" border="0" width='50px' height='50px' />
        </div>
      </Stack>
      <TextField
        fullWidth
        id="email-input-field"
        label="Email"
        autoComplete="current-password"
        error={errorMessage != null}
        helperText={errorMessage != null && (<div>{errorMessage}</div>)}
      />
      <TextField
        fullWidth
        id="filled-password-input"
        label="Password"

        type={visiablePassword ? 'text' : 'password'}
        autoComplete="current-password"
        error={errorMessage != null}
        helperText={errorMessage != null && (<div>{errorMessage}</div>)}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={() => setVisiablePassword(!visiablePassword)}>{visiablePassword ? <VisibilityOff /> : <Visibility />} </IconButton>
          </InputAdornment>
        }}

      />

      <Button variant="contained" type='form'>
        Login
      </Button>
    </form>
  );
}

export default Login;
