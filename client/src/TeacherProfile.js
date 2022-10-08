import './App.css';
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, FormLabel, Button} from '@mui/material';
import './TeacherProfile.css';

export class TeacherProfile extends React.Component{
    render(){
        return (
            <div className='root'>
                
                <form className='form'>
                    <label>Teacher Information Form</label>
                    <div >
                        <TextField 
                            id="outlined-basic"
                            label="Name" 
                            variant="outlined"
                            type="text" 
                        />
                    </div>    
                    <div>
                        <FormLabel component="legend">Skills</FormLabel>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox/>} label='Math'/>
                            <FormControlLabel control={<Checkbox/>} label='English'/>
                            <FormControlLabel control={<Checkbox/>} label='Physed'/>
                            <FormControlLabel control={<Checkbox/>} label='History'/>
                            <FormControlLabel control={<Checkbox/>} label='Science'/>
                        </FormGroup>
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        );
    }
}