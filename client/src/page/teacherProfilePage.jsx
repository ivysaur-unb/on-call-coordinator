import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './teacherProfilePage.css';
import {Button, Box, TextField, IconButton,Stack, InputAdornment, Typography, Modal} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {getSchedule} from '../backend-requests/teachers';
import { useContext } from "react";
import { UserContext } from '../App';
import Table from '../components/scheduleTable';

function TeacherProfile(){

    const user = useContext(UserContext);

    const [error, setError] = React.useState(false);
    const [visiablePassword, setVisiablePassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [pass, setPass] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [schedule, setSchedule] = React.useState(false);
    const [errorSchedule, setErrorSchedule] = React.useState(false);



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
    
    function handleEditInfo(event){
        handleClose();
    }

    useEffect(()=>{
        getSchedule(user.email)
        .then(response => response.json())
        .then(dataIn => {
            if(dataIn.error.length === 0){
                setErrorSchedule(dataIn.error);
            }
            else{
                setSchedule(dataIn.result);
            }
        });
    }, []);


    return(
        <Box className='box-t'>
            <Stack className='teacherprofile-stack' spacing={3}>
                <Typography variant="h5" gutterBottom >
                    Teacher Information
                </Typography>
                <TextField
                    className='stack-item'
                    id="standard-read-only-input"
                    label="Name"
                    defaultValue={user ? user.name : "TEACHER"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className='stack-item'
                    id="standard-read-only-input"
                    label="Email"
                    defaultValue={user ? user.email : "TEACHER"}
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
                                defaultValue={user ? user.name : "TEACHER"}
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
                            <Button  variant="contained" onClick={handleEditInfo}> Submit</Button>
                            <Button  variant="contained" onClick={handleClose}> Cancel</Button>
                        </Stack>
                    </Box>
                </Modal>
            </Stack>
            <Typography variant="h5" gutterBottom >
                    Teacher Schedule
            </Typography>
            {errorSchedule && <Typography variant="body" gutterBottom>Error loading the schedule</Typography>}
            {schedule && <Table dataIn={schedule} sx={{maxWidth: 1200}}/>}
        </Box>
        
    );
}

export default TeacherProfile;