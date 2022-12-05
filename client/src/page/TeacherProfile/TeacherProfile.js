import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete} from '@mui/material';
import './TeacherProfile.css';
import {teachables} from '../../Courses';
//import DefaultProfilePicture from '../../default-profile-picture.jpg';
import { theme } from '../theme';
import {ThemeProvider} from '@mui/material';
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
const textFieldColor = 'white';

export class TeacherProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            teachables: [],
            pictureUrl: null,
        }
    }

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
        const formData = new FormData(e.target);
        formData.append("teachables", JSON.stringify(this.state.teachables));
        fetch('/teachers', {
            method: 'POST',
            body: formData,
            headers: {
                // "Content-Type" : "multipart/form-data; boundary=------some-random-characters",
                "Authorization" : sessionStorage.getItem('token'),
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            e.target.reset();

        });
    }

    onCourseChange = (event, newValue) => {
        this.setState({teachables: newValue});
    }

    render(){
        return (
          
            <div className='create-teacher-page'>
              <ThemeProvider theme={theme}>
              <form className='form create-form' onSubmit={this.handleSubmission} encType='multipart/form-data'>
                    
                    <Box className='box' gap={'12px'}>
                    <header className='label'>Teacher Profile</header>
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
                            sx={{ color: '#153c7a', borderColor: '#6183ba' }}
                            inputProps={{ style: { color: textFieldColor,border:textFieldColor } }}
                            InputLabelProps={{style:{color:textFieldColor,outlineColor:textFieldColor}}}
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
                            sx={{ color: '#153c7a', borderColor: '#6183ba' }}
                            name="email"
                            inputProps={{ style: { color: textFieldColor,border:textFieldColor } }}
                            InputLabelProps={{style:{color:textFieldColor,outlineColor:textFieldColor}}}
                        />
                    </div>    
                    <div id='teachable-list'>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            className='auto'
                            size='small'
                            margin-top='100px'
                            sx={{ color: '#153c7a', borderColor: '#6183ba',overflow:'hidden' }}
                            options={teachables}
                            getOptionLabel={(option) => option.label}
                            filterSelectedOptions
                            onChange={this.onCourseChange}
                            
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Teachables"
                                placeholder="Select Courses"
                              
                            />
                            )}
                        />
                    </div>
                    <div>
                        <Button className='submitButton' variant='contained' type='submit'>Create Teacher</Button>
                    </div>
                    </Box>
                    
                </form>
                </ThemeProvider>
            </div>
        );
    }
}