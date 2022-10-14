import React from "react";
import { TextField,Button } from "@mui/material";
import '../page/Board.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const CreateSchoolForm = function({}){
    const [selectedProgram, setSelectedProgram] = React.useState('');

    const programs = ['Math','Online','Outside'];
    const programElements = [];
    programs.map( (element)=>{
        programElements.push(<MenuItem value={element} key={element}>{element}</MenuItem>)
    })

    return(
        <form className="create-school-form">
            <div className="school-form-name-students">
                <TextField id="school-name" label="Name" variant="outlined" />
                <TextField id="school-students" label="Number of Students" type={'number'} variant="outlined" />
           </div>
           <TextField id="school-address" label="Address" variant="outlined" />
           <FormControl fullWidth>
            <InputLabel id="school-program-input">Speciality Programs</InputLabel>
            <Select
                labelId="school-program-label"
                id="school-program"
                label='Speciality Programs'
                value={selectedProgram}
                onChange={(event)=>setSelectedProgram(event.target.value)}
            >
                {programElements}
                
                
            </Select>
            </FormControl>

            <Button id="school-submit"> Submit </Button>
        </form>
    )
}

export default CreateSchoolForm;