import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './teacherProfilePage.css';
import {Box, TextField, Stack, Typography, List, ListItem, ListItemText} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {getSchedule, getTeachables} from '../backend-requests/teachers';
import { useContext } from "react";
import { UserContext } from '../App';
import Table from '../components/scheduleTable';

function TeacherProfile(){

    const user = useContext(UserContext);
    const [schedule, setSchedule] = React.useState(false);
    const [errorSchedule, setErrorSchedule] = React.useState(false);
    const [teachable, setTeachable] = React.useState([]);
    const [errorTeachable, setErrorTeachable] = React.useState(false);

    useEffect(()=>{
        getTeachables(user.email)
        .then(response => response.json())
        .then(dataIn => {
            if(dataIn.error){
                setErrorTeachable(dataIn.error);
            }
            else{
                setTeachable(dataIn.result.teachable);
            }
        });

        getSchedule(user.email)
        .then(response => response.json())
        .then(dataIn => {
            if(dataIn.result !== null){
                setSchedule(dataIn.result);
            }
            else{
                setErrorSchedule(dataIn.error);
            }
        });
    }, []);


    return(
        <Box className='box-t'>
            <Stack className='teacherprofile-stack' spacing={3}>
                <Typography variant="h5" >
                    Teacher Information
                </Typography>
                <TextField
                    className='stack-item'
                    id="standard-read-only-input"
                    label="Name"
                    disabled='true'
                    defaultValue={user ? user.name : "TEACHER"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className='stack-item'
                    id="standard-read-only-input"
                    label="Email"
                    disabled='true'
                    defaultValue={user ? user.email : "TEACHER"}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                
                <Box>
                    <Typography variant="h5" component="div">
                        Teachables
                    </Typography>
                    {errorTeachable && <Typography variant="body" gutterBottom>Error loading teachables</Typography>}
                    {teachable && teachable.length > 0 &&
                    <div className='teachable-in'>
                        <List>
                            {teachable.map((val) => {
                                return <ListItem disablePadding><ListItemText primary={val.name}/></ListItem>
                            })}
                        </List>
                    </div>
                    }
                </Box>
                    
        
            </Stack>
            <Typography variant="h5" gutterBottom >Schedule</Typography>
            {errorSchedule && <Typography variant="body" gutterBottom>Error loading schedule</Typography>}
            {schedule && <Table dataIn={schedule} sx={{maxWidth: 1200}}/>}
        </Box>
        
    );
}

export default TeacherProfile;