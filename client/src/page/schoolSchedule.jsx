import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './schoolSchedule.css';
import {Button, Box} from '@mui/material';
import {postSchedules} from '../backend-requests/schoolSchedule';
import Table from '../components/scheduleTable';

function SchoolSchedule(){

    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState([]);
    let dataRec = useRef(false);

    function onFileChange(event){
        if (!event.target.files[0]) {return;}

        const formData = new FormData();
        formData.append('data', event.target.files[0]);
        
        setSelectedFile(formData);

        postSchedules(formData)
        .then(response => response.json())
        .then(dataIn => {
            setData(dataIn.schedules);
        });
    }

    useEffect(() => {
        if(data && data.length > 0) {
            dataRec.current = true;
        }
    }, [data])

    return(
        
        <div className='schoolSchedule-form'>
            <Box className='schoolSchedule-box'>
                <div className='schoolSchedule-info'>
                    <h1>School Schedule Upload Form</h1>
                    <Button variant="contained" component="label">
                        Upload
                        <input hidden accept=".xlsx" type="file" name="data" onChange={onFileChange}/>
                    </Button>
                </div>
                {dataRec.current && <p>The schedule has been uploaded and is displayed here:</p>}
                {dataRec.current && <Table dataIn={data} sx={{maxWidth: 1200}}/>}
            </Box>
        </div>
    )
}

export default SchoolSchedule;