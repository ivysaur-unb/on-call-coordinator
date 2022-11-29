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

    useEffect(() => {
        getTeachers().then(data => {
          setTeachers(data)
          console.log(data.initials)
        })
        setOnCalls('hi')
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
        const handleSubmission = (data) => {
            getTeacherOnCalls(1).then(data => {
                //setOnCalls(data)
                console.log(data)
                
            })
            console.log("hi")
            setOnCalls('heyy')
            /*setTeachers(data.teachers);
            if(data.errors.length > 0) {
              console.log(data.errors);
            }*/
          };

        const onTeacherChange = event => {
            //setChosenTeacher(event.option.initials)
            setChosenTeacher(teachers[1].initials)
            console.log(chosenTeacher);
        }
        //TODO: get chosen option from box

        const handleClick = () => {
            getTeacherOnCalls(1).then(data => {
                setOnCalls(data)
                console.log(data)
                
                
            })
        }

    return (
        <div className='root'>
            <form className='form' onSubmit={handleSubmission} encType='multipart/form-data'>
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
                    <TextField {...params} label="Teacher" placeholder="Select Teacher Initials" />
                    )}
                />
                </Box>
                <div>
                    <Button className='submitButton' variant='outlined' sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba', size: 'small' }} type='submit' onChange={handleSubmit}>View On-Calls</Button>
                </div>
                <div>
                    <h3>On calls: {onCalls}</h3>
                </div>
            </form>
            <div>
            <Button variant="contained" component="label" onClick={handleClick}>
                    View On-Calls
            </Button>
            </div>


        </div>
    );
}