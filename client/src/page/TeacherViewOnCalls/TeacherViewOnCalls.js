import "./TeacherViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography, List, ListItem, ListItemText, Divider} from '@mui/material';
import { myOnCalls } from "../../backend-requests/viewOnCalls";

import { useContext } from "react";
import { UserContext } from "../../App";

export default function VPViewOnCalls() {

    const user = useContext(UserContext);
    const [onCalls, setOnCalls] = useState({})

    useEffect(() => {
        myOnCalls(user.id).then(data => {
          setOnCalls(data)
        })
      }, []);
  



    return (
        <div className='root'>
            {onCalls.length > 0 &&
                    <Box>
                        <Typography variant="h5" component="div">
                            My On-Calls
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