import './App.css';
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, FormLabel, Button, Autocomplete} from '@mui/material';
import './TeacherProfile.css';



export class TeacherProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            courses: ['TESTC'],
            schedule: [[], [], [], [], []]
        }
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    onTextChange = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmission = event => {
        //alert(this.state.name);
        //this.state({name: event.target.value});
        this.setState({courses: event.target.value})
        alert(event.target.value)
    }

    handleAddCourses = event => {
        //alert(this.state.courses)
    }

    render(){
        return (
            <div className='root'>
                
                <form className='form' onSubmit={this.handleSubmission}>
                    <label>Teacher Information Form</label>
                    <div >
                        <TextField 
                            id="outlined-basic"
                            label="Name" 
                            variant="outlined"
                            type="text"
                            onChange={this.onTextChange}
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
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}
const courses = [
    {label: 'Math'},
    {label: 'English'},
];