import "./VPViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography} from '@mui/material';
import { getTeachers } from "../../backend-requests/viewOnCalls";
import { getTeacherOnCalls } from "../../backend-requests/viewOnCalls";


export default function VPViewOnCalls() {


    //const [itemsAutocomplete, setItemsAutocomplete] = useState([])
    /*const onCourseChange = event => {
        this.setState({ teachables: [...this.state.teachables, {name: `${event.target.textContent}`}] });
    }*/

    const [teachers, setTeachers] = useState([])
    const [chosenTeacher, setChosenTeacher] = useState('')
    const [onCalls, setOnCalls] = useState('')
    const [value, setValue] = useState(teachers[0]);

    

    useEffect(() => {
        getTeachers().then(data => {
          setTeachers(data)
        })
      }, []);

      const handleSubmit = () => {
        setOnCalls("hello")
      }

  
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

            const selectedTeacher = document.getElementById("tags-outlined").value;
            console.log(selectedTeacher);
            console.log(chosenTeacher);
        }
        //TODO: get chosen option from box

        const handleClick = (data) => {
            /*getTeacherOnCalls(1).then(data => {
                setOnCalls(data)
                console.log(data)*/
                
            //})
            getTeacherOnCalls(1).then(data => {
                //setOnCalls(data)
                //for data.length
                console.log(data[0])
                
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
                    onChange={onTeacherChange}
                    options={teachers}
                    getOptionLabel={(option) => option.initials}
                    renderInput={params => (
                    <TextField {...params} label="Teacher" placeholder="Select Teacher Initials" id="teacher-text"/>
                    )}
                />
                </Box>
                <div>
                    <h3>On calls: {onCalls}</h3>
                </div>
            
            <div>
            <Button variant="outlined" component="label" onClick={handleClick} sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba'}}>
                    View On-Calls
            </Button>
            </div>


        </div>
    );
}