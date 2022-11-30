import "./VPViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography, List, ListItem, ListItemText} from '@mui/material';
import { getTeachers } from "../../backend-requests/viewOnCalls";
import { getTeacherOnCalls } from "../../backend-requests/viewOnCalls";


export default function VPViewOnCalls() {


    //const [itemsAutocomplete, setItemsAutocomplete] = useState([])
    /*const onCourseChange = event => {
        this.setState({ teachables: [...this.state.teachables, {name: `${event.target.textContent}`}] });
    }*/

    const [teachers, setTeachers] = useState([])
    const [chosenTeacher, setChosenTeacher] = useState()
    const [onCalls, setOnCalls] = useState({})

    const [schedClassId, setSchedClassId] = useState([])
    const [date, setDate] = useState([])
    //const [value, setValue] = useState(teachers[0]);

    

    useEffect(() => {
        getTeachers().then(data => {
          setTeachers(data)
        })
      }, []);



  
      /*const handleSubmission = (data) => {
          /*setTeachers(data.teachers);
          if(data.errors.length > 0) {
            console.log(data.errors);
          }*/
        //};
        /*const handleSubmission = (data) => {
            getTeacherOnCalls(1).then(data => {
                //setOnCalls(data)
                console.log(data[0])
                
            })
            // setOnCalls('heyy')
            /*setTeachers(data.teachers);
            if(data.errors.length > 0) {
              console.log(data.errors);
            }*/
          //};

        const onTeacherChange = event => {
            //setChosenTeacher(event.option.initials)
            setChosenTeacher(document.getElementById("tags-outlined").value)

            //const selectedTeacher = document.getElementById("tags-outlined").value;
            //console.log(selectedTeacher);
            console.log(chosenTeacher);
        }
        //TODO: get chosen option from box

        const handleClick = (data) => {
            /*getTeacherOnCalls(1).then(data => {
                setOnCalls(data)
                console.log(data)*/
                
            //})
            getTeacherOnCalls(parseInt(chosenTeacher)).then(data => {
                //setOnCalls(data.result.onCalls)
                setOnCalls(data)
                //for data.length
                console.log(data[0])

                /*setOnCalls(onCalls => ({
                    ...onCalls,
                  }));*/
                //const result = Object.keys(onCalls).map((key) => onCalls[key]);
                //console.log(result);
                //console.log(result[0][0]);
                //setOnCalls(result);

                //setDate(Object.keys(onCalls[0]).map((day) => onCalls[0][day]);
                
                
            })
            console.log(onCalls)
            console.log(onCalls[0].day)
            //if null write no on calls
            //setOnCalls("hello")
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
                    onChange={onTeacherChange}
                    options={teachers}
                    getOptionLabel={(option) => String(option.id)}
                    renderInput={params => (
                    <TextField {...params} label="Teacher" placeholder="Select Teacher ID" id="teacher-text"/>
                    )}
                />
                </Box>
                
            
            <div>
            <Button variant="outlined" component="label" onClick={handleClick} sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba'}}>
                    View On-Calls
            </Button>
            </div>
            <div>
                    <h3>On calls: </h3>
            </div>
            {onCalls.length > 0 &&
                    <Box>
                        <Typography variant="h5" component="div">
                            On-Calls
                        </Typography>
                        <div className='teachable-in'>
                            <List>
                                {onCalls.map((val) => {
                                    return <ListItem disablePadding><ListItemText primary={val.day}/></ListItem>
                                })}
                            </List>
                        </div>
                    </Box>
                }    
        </div>
    );
    
}