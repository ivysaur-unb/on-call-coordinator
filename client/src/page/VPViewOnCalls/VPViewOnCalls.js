import "./VPViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography, List, ListItem, ListItemText, Divider, Stack } from '@mui/material';
import { getTeachers } from "../../backend-requests/viewOnCalls";
import { getTeacherOnCalls } from "../../backend-requests/viewOnCalls";
import { theme } from '../theme';
import {ThemeProvider} from '@mui/material';

export default function VPViewOnCalls() {
    const textFieldColor = 'white';
    const [teachers, setTeachers] = useState([])
    var chosenTeacher;
    const [onCalls, setOnCalls] = useState({})

    useEffect(() => {
        getTeachers().then(data => {
            setTeachers(data)
        })
    }, []);

    const handleClick = (data) => {
        chosenTeacher = document.getElementById("tags-outlined").value;
        console.log(chosenTeacher);
        console.log(document.getElementById("tags-outlined"))
        getTeacherOnCalls(parseInt(chosenTeacher)).then(data => {
            setOnCalls(data)
            console.log(data)

        })
    }

    return (
        
        <div className='vp-view-oncall create-form'>
                          <ThemeProvider theme={theme}>

            <Box className='box-oncall'>
                <label className='label'>Teacher On-Calls</label>
                <div>
                    <Typography sx={{ fontSize: '18px', lineHeight: '20px' }}>Select the teacher for which you would like to view the on calls</Typography>
                </div>

                <Autocomplete
                    
                    single="true"
                    id="tags-outlined"
                    className='auto'
                    size='small'
                    margin-top='100px'
                    sx={{ color: '#153c7a', borderColor: '#6183ba' }}
                    // onChange={onTeacherChange}
                    options={teachers}
                    getOptionLabel={(option) => String(option.id)}
                    renderInput={params => (
                        <TextField {...params} label="Teacher" InputLabelProps={{style:{color:textFieldColor,outlineColor:textFieldColor}}} placeholder="Select Teacher ID" id="teacher-text" sx={{color:'white'}}/>
                    )}
                />
                 <div>
             
                <Button className='submitButton' variant='contained' onClick={handleClick} type='submit'>View On-Calls</Button>
            </div>
            
            </Box>


           

            {onCalls.length > 0 &&
                <Box>
                    <Typography variant="h5" component="div">
                        On-Calls
                    </Typography>
                    <div className='oncalls-in'>
                        <List>
                            <ListItem ><ListItemText primary="Class" /><Divider variant="middle" component="li" /><ListItemText primary="Location" /><Divider variant="middle" component="li" /><ListItemText primary="Period" /><Divider variant="middle" component="li" /><ListItemText primary="Day" /></ListItem>
                            {onCalls.map((val) => {
                                return <ListItem ><ListItemText primary={val.scheduledClass.class? val.scheduledClass.class.title : 'Untitled'} /><Divider variant="middle" component="li" /><ListItemText primary={val.scheduledClass.location} /><Divider variant="middle" component="li" /><ListItemText primary={val.scheduledClass.period} /><Divider variant="middle" component="li" /><ListItemText primary={val.day.split("T")[0]} /></ListItem>
                            })}
                        </List>
                    </div>
                </Box>
            }
            {onCalls.length === 0 &&
                <div className="endSection">
                    <Typography variant="h5" component="div">
                        No On-Calls To Display
                    </Typography>
                </div>

            }
            </ThemeProvider>
        </div>
    );

}