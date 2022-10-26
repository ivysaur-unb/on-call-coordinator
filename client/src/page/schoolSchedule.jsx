import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './schoolSchedule.css';
import Button from '@mui/material/Button';
import {postSchedules} from '../backend-requests/schoolSchedule';
import Table from '../components/scheduleTable';

function SchoolSchedule(){

    const [selectedFile, setSelectedFile] = useState();
    const [data, setData] = useState([]);
    let dataRec = useRef(false);

    function onFileChange(event){
        if (!event.target.files[0]) {return;}
        //alert(event.target.files[0])
        const formData = new FormData();
        formData.append('data', event.target.files[0]);
        //alert(formData);
        setSelectedFile(formData);

        //alert(selectedFile);

        postSchedules(formData)
        .then(response => response.json())
        .then(dataIn => {
            setData(dataIn.schedules);
        });
    }

    useEffect(() => {
        if(data){
            dataRec.current = true;
        }
    }, [data])

    return(
        <div className='schoolSchedule-form'>
            <h1>School Schedule Upload Form</h1>
            <Button variant="contained" component="label">
                Upload
                <input hidden accept=".xlsx" type="file" name="data" onChange={onFileChange}/>
            </Button>
            {dataRec.current && <Table dataIn={data} sx={{maxWidth: 1200}}/>}
        </div>
    )
}

export default SchoolSchedule;