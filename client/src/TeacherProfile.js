import './App.css';
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete} from '@mui/material';
import './TeacherProfile.css';
//import css from './TeacherProfile.css';
import {courses} from './Courses.js';
//import { red } from '@mui/material/colors';
//import TopBar from './components/TopBar';
//import TopBarContainer from './container/TopBarContainer';
//import TopBarWrapper from './components/TopBarWrapper'

/*import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)"
    }
  }
}));*/

export class TeacherProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            initials: 'test',
            courses: [],
            schedule: [[], [], [], [], []]
        }
        this.handleSubmission = this.handleSubmission.bind(this);
    }


    onNameChange = event => {
        this.setState({ name: event.target.value });
    }
    onEmailChange = event => {
        this.setState({ email: event.target.value });
    }
    onCourseChange = event => {
        this.setState({ courses: [...this.state.courses, {name: `${event.target.textContent}`}] });
    }


    handleError = () => {
        alert(this.state.error);
    }

    handleSubmission = () => {
        if(this.state.name !== '' && this.state.email !== ''){
            const options ={
                method: 'POST',
                body:JSON.stringify({
                  email: this.state.email,
                  name: this.state.name,
                  role: 'TEACHER',
                  courses: this.state.courses
                }),
                headers: {
                  "Content-Type": "application/json"
                }
            }
            fetch('/teachers', options).then(response=>{
                if(response.status === '400'){
                    this.setState({error: response.message});
                    this.handleError()
                }
            });
        }
    }


    render(){
        return (
            <div className='root'>
                <form className='form' onSubmit={this.handleSubmission}>
                    <label className='label'>Teacher Creation Form</label>
                    <Box className='box'>
                    <div >
                        <TextField 
                            id="filled-basic"
                            label="Name" 
                            variant="outlined"
                            type="text"
                            size="small"
                            sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba' }}
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div>
                        <TextField 
                            id="filled-basic"
                            label="Email" 
                            variant="outlined"
                            type="text"
                            size="small"
                            sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba' }}
                            onChange={this.onEmailChange}
                        />
                    </div>    
                    <div>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            className='auto'
                            size='small'
                            margin-top='100px'
                            sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba' }}
                            options={courses}
                            getOptionLabel={(option) => option.label}
                            filterSelectedOptions
                            onChange={this.onCourseChange}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Courses"
                                placeholder="Select Courses"
                            />
                            )}
                        />
                    </div>
                    </Box>
                    <div>
                        <Button className='submitButton' variant='outlined' sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba' }} type='submit'>Create Teacher</Button>
                    </div>
                </form>
            </div>
        );
    }
}