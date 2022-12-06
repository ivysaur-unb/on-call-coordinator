import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './schoolSchedule.css';
import {Button, Box} from '@mui/material';
import {postSchedules} from '../backend-requests/schoolSchedule';
import Table from '../components/scheduleTable';
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material"

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
        
        <div className='upload-courses-root'>
            <ThemeProvider theme={theme}>
            <Box className='box'>
                    <h1>School Schedule Upload Form</h1>
                    <Button variant="contained" component="label">
                        Upload
                        <input hidden accept=".xlsx" type="file" name="data" onChange={onFileChange}/>
                    </Button>
                {dataRec.current && <p>The schedule has been uploaded and is displayed here:</p>}
                {dataRec.current && <Table dataIn={data.result} sx={{maxWidth: 1200}}/>}
            </Box>
            </ThemeProvider>
        </div>
    )
}

export default SchoolSchedule;