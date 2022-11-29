import "./VPViewOnCalls.css";
//import { useState } from 'react';
//import { Button } from "@mui/material";
//import { Box } from "@mui/system";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography} from '@mui/material';
import {teachables} from '../../Courses';
import DefaultProfilePicture from '../../default-profile-picture.jpg';
//import { createTeachables } from "../../../../server/helpers/createTeachables";
import { getTeachers } from "../../backend-requests/viewOnCalls";

export default function VPViewOnCalls() {


    //const [itemsAutocomplete, setItemsAutocomplete] = useState([])
    //let teachers = getTeachers(1);
  
    /*useEffect(() => {
      getTeachers(1).then(data => {
        setTeachers(data)
        console.log(data)
      })
    }, []);*/


    /*const onCourseChange = event => {
        this.setState({ teachables: [...this.state.teachables, {name: `${event.target.textContent}`}] });
    }*/

    const [teachers, setTeachers] = useState([])
    const [chosenTeacher, setChosenTeacher] = useState('')

    useEffect(() => {
        getTeachers().then(data => {
          setTeachers(data)
          console.log(data.initials)
        })
      }, []);

  
      /*const handleSubmission = (data) => {
          /*setTeachers(data.teachers);
          if(data.errors.length > 0) {
            console.log(data.errors);
          }*/
        //};
        const handleSubmission = event => {
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
  


    //render(){
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
                        <Button className='submitButton' variant='outlined' sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba', size: 'small' }} type='submit'>View On-Calls</Button>
                    </div>
                </form>
 

            </div>
        );
    //}
}