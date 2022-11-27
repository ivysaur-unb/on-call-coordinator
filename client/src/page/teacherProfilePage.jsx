import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './teacherProfilePage.css';
import {Button, Box, TextField, IconButton,Stack, InputAdornment, Typography, Modal, Table} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {verifyUser} from '../backend-requests/users';

function TeacherProfile(){

    const [error, setError] = React.useState(false);
    const [visiablePassword, setVisiablePassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [pass, setPass] = React.useState(null);
    const [verif, setVerif] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    function handlePasswordUpdate(event){
        setPass(event.target.value);
    }
    
    function onEditInfo(event){
        if(pass === null){
            alert('You must enter your password to edit your information.');
        }
        else{
            //Need to figure out how to grab the user from login
            verifyUser()
            .then(response => response.json())
            .then(dataIn => {
                setVerif(dataIn.result);
            });
        }
    }

    return(
        <Stack className='teacherprofile-stack' spacing={2}>
            <Typography variant="h5" gutterBottom className='typography'>
                Teacher Information
            </Typography>
            <TextField
                className='stack-item'
                id="standard-read-only-input"
                label="Name"
                defaultValue="User name"
                InputProps={{
                    readOnly: true,
                }}
            />
            <TextField
                className='stack-item'
                id="standard-read-only-input"
                label="Email"
                defaultValue="some email"
                InputProps={{
                    readOnly: true,
                }}
            />
            
            <Button onClick={handleOpen} variant="contained" className='edit-button'>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit information and select save
                        </Typography>
                        <TextField
                            id="outlined-required"
                            label="Name"
                            defaultValue="User name"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            id="filled-password-input"
                            label="Enter Password to Edit Information"

                            type={visiablePassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            error={errorMessage != null}
                            helperText={errorMessage != null && (<div>{errorMessage}</div>)}
                            onChange={handlePasswordUpdate}
                            InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={() => setVisiablePassword(!visiablePassword)}>{visiablePassword ? <VisibilityOff /> : <Visibility />} </IconButton>
                            </InputAdornment>
                            }}
                        />
                        <Button  variant="contained" onClick={handleClose}> Submit</Button>
                    </Stack>
                </Box>
            </Modal>

            <Table sx={{maxWidth: 1200}}/>
        </Stack>
    );
}

export default TeacherProfile;