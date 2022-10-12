import './App.css';
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, FormLabel, Button, Autocomplete} from '@mui/material';
import './TeacherProfile.css';
import {courses} from './Courses.js';

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

   onSubmissionInitials(){ //need to figure out how to save the state to initials
        let names = this.state.name.split(' ');
        let initialsName = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initialsName += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        alert(initialsName);
        return initialsName;
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
                console.log(response);
            });
        }
        //alert(this.state.initials);
    }


    render(){
        return (
            <div className='root'>
                <form className='form' onSubmit={this.handleSubmission}>
                    <label className='label'>Teacher Creation Form</label>
                    <div >
                        <TextField 
                            id="outlined-basic"
                            label="Name" 
                            variant="outlined"
                            type="text"
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div>
                        <TextField 
                            id="outlined-basic"
                            label="Email" 
                            variant="outlined"
                            type="text"
                            onChange={this.onEmailChange}
                        />
                    </div>    
                    <div>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            className='auto'
                            size='small'
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
                    <div>
                        <Button type='submit'>Create Teacher</Button>
                    </div>
                </form>
            </div>
        );
    }
}