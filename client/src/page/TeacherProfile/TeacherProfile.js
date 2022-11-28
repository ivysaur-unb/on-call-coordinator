import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete} from '@mui/material';
import './TeacherProfile.css';
import {teachables} from '../../Courses';
// import DefaultProfilePicture from '../../default-profile-picture.jpg';

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
            teachables: [],
            schedule: [[], [], [], [], []],
            pictureUrl: null,
        }
    }


    // onNameChange = event => {
    //     this.setState({ name: event.target.value });
    // }
    // onEmailChange = event => {
    //     this.setState({ email: event.target.value });
    // }
    // onCourseChange = event => {
    //     this.setState({ teachables: [...this.state.teachables, {name: `${event.target.textContent}`}] });
    // }

    // My Attempt to read pictures:
    onPictureChange = (event) => {
        if (!event.target.files[0]) {
            return;
        }
        let file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(event.target.files[0])
            this.setState({pictureUrl: url});
        }
    }

    handleError = () => {
        alert(this.state.error);
    }
    handleSubmission = (e) => {
        e.preventDefault();
        console.log({e});
        fetch('/teachers', {
            method: 'POST',
            body: new FormData(e.target),
            headers: {
                // "Content-Type" : "multipart/form-data; boundary=------some-random-characters",
                "Authorization" : sessionStorage.getItem('token'),
            }
        })
        .then(response => response.json())
        .then(data => console.log(data));
    //     if(this.state.name !== '' && this.state.email !== '') {
    //         const options = {
    //             method: 'POST',
    //             body:JSON.stringify({
    //               email: this.state.email,
    //               name: this.state.name,
    //               role: 'TEACHER',
    //               teachables: this.state.teachables,
    //             }),
    //             headers: {
    //               "Content-Type": "application/json",
    //               "Authorization" : sessionStorage.getItem('token'),
    //             }
    //         }
    //         fetch('/teachers', options).then(response=>{
    //             if(response.status === '400'){
    //                 this.setState({error: response.message});
    //                 this.handleError()
    //             }
    //         });
    //     }
    }


    render(){
        return (
            <div className='root'>
                <form className='form' method='post' onSubmit={this.handleSubmission} encType='multipart/form-data' action='/teachers'>
                    <label className='label'>New Teacher Profile</label>
                    <Box className='box'>
                    <div className='imageForm'>
                        <img className='picture' src={this.state.pictureUrl || "/default-profile-picture.jpg"} alt=''/>
                        <input type="file" name='picture' accept="image/*" onChange={this.onPictureChange} />
                    </div>
                    <div>
                        <TextField 
                            id="filled-basic"
                            label="Name" 
                            variant="outlined"
                            type="text"
                            size="small"
                            sx={{ color: '#153c7a', backgroundColor: 'whitesmoke', borderColor: '#6183ba' }}
                            name="name"
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
                            name="email"
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
                            options={teachables}
                            getOptionLabel={(option) => option.label}
                            filterSelectedOptions
                            // onChange={this.onCourseChange}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Teachables"
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