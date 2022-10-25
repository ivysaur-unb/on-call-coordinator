import React from 'react';
import { useState, useEffect } from 'react';
import './schoolSchedule.css';
import Button from '@mui/material/Button';
import {postSchedules} from '../backend-requests/schoolSchedule';

function SchoolSchedule(){

    const [selectedFile, setSelectedFile] = useState();

    function onFileChange(event){
        if (!event.target.files[0]) {return;}
        //alert(event.target.files[0])
        const formData = new FormData();
        formData.append('data', event.target.files[0]);
        //alert(formData);
        setSelectedFile(formData);

        //alert(selectedFile);

        postSchedules(formData);
    }

    return(
        <div className='schoolSchedule-form'>
            <h1>School Schedule Upload Form</h1>
            <Button variant="contained" component="label">
                Upload
                <input hidden accept=".xlsx" type="file" name="data" onChange={onFileChange}/>
            </Button>
            <h3>{selectedFile !== undefined? 'File uploaded': 'No file uploaded'}</h3>
        </div>
    )
}

export default SchoolSchedule;