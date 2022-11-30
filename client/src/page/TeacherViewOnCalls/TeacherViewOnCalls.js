import "./TeacherViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography, List, ListItem, ListItemText} from '@mui/material';
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
            <h2>My On-Calls: </h2>
            {onCalls.length > 0 &&
                    <Box>
                        <div className='oncalls-in'>
                            <List>
                            <ListItem ><ListItemText primary="Class"/><ListItemText primary="               "/><ListItemText primary="Day"/></ListItem>
                                {onCalls.map((val) => {
                                    return <ListItem ><ListItemText primary={val.scheduledClassId}/><ListItemText primary="----------------"/><ListItemText primary={val.day}/></ListItem>
                                })}
                            </List>
                        </div>
                    </Box>
                }    
                {onCalls.length === 0 &&
                    
                        <Typography variant="h5" component="div">
                            No On-Calls To Display
                        </Typography>
                       
                }  
        </div>
    );

}