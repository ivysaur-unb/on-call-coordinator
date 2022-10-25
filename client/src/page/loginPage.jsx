import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  '../page/loginPage.css'
function Login() {


    return (

    <div className='login'>
    
    <div className='page-header'>
        Login
    </div>
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

    <Button variant="contained">Submit</Button>


    </div>
    )


}

export default Login;
