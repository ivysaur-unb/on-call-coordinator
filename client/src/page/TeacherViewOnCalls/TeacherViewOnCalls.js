import "./TeacherViewOnCalls.css";
import React, { useState, useEffect } from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, Box, FormLabel, Button, Autocomplete, Typography} from '@mui/material';
import {teachables} from '../../Courses';
import DefaultProfilePicture from '../../default-profile-picture.jpg';
//import { createTeachables } from "../../../../server/helpers/createTeachables";
import { myOnCalls } from "../../backend-requests/viewOnCalls";

export default function VPViewOnCalls() {




    const [teacher, setTeacher] = useState()
    const [onCalls, setOnCalls] = useState([])

    useEffect(() => {
        myOnCalls(1).then(data => {
          setOnCalls(data)
          //console.log(data.initials)
        })
      }, []);
      //TODO: get for currently logged in teacher

      const OC = myOnCalls(1)[0];
      console.log(myOnCalls(1)[0]);








    return (
        <div className='root'>
            <h2>My On-Calls: {OC}</h2>
        </div>
    );

}