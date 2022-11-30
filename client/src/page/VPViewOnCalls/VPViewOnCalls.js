import "./VPViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography, List, ListItem, ListItemText, Divider} from '@mui/material';
import { getTeachers } from "../../backend-requests/viewOnCalls";
import { getTeacherOnCalls } from "../../backend-requests/viewOnCalls";

export default function VPViewOnCalls() {

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
        <div className='root'>
            
                <label className='label'>Teacher On-Calls</label>
                <Box className='box'>
                <div>
                    <Typography sx={{fontSize: '18px', lineHeight:'20px'}}>Select the teacher for which you would like to view the on calls</Typography>
                </div>    

                <Autocomplete
                    single="true"
                    id="tags-outlined"
                    className='auto'
                    size='small'
                    margin-top='100px'
                    sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba' }}
                    // onChange={onTeacherChange}
                    options={teachers}
                    getOptionLabel={(option) => String(option.id)}
                    renderInput={params => (
                    <TextField {...params} label="Teacher" placeholder="Select Teacher ID" id="teacher-text"/>
                    )}
                />
                </Box>
                
            
            <div>
            <Button variant="outlined" component="label" onClick={handleClick} sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba', marginBottom: '80px'}}>
                    View On-Calls
            </Button>
            </div>
           
            {onCalls.length > 0 &&
                    <Box>
                        <Typography variant="h5" component="div">
                            On-Calls
                        </Typography>
                        <div className='oncalls-in'>
                            <List>
                            <ListItem ><ListItemText primary="Class"/><Divider variant="middle" component="li" /><ListItemText primary="Location"/><Divider variant="middle" component="li" /><ListItemText primary="Period"/><Divider variant="middle" component="li" /><ListItemText primary="Day"/></ListItem>
                                {onCalls.map((val) => {
                                    return <ListItem ><ListItemText primary={val.scheduledClass.class.title}/><Divider variant="middle" component="li" /><ListItemText primary={val.scheduledClass.location}/><Divider variant="middle" component="li" /><ListItemText primary={val.scheduledClass.period}/><Divider variant="middle" component="li" /><ListItemText primary={val.day.split("T")[0]}/></ListItem>
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
        </div>
    );
    
}