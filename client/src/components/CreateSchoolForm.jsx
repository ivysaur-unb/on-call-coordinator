import React from "react";
import { TextField, Button } from "@mui/material";
import '../page/Board.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { postSchools } from "../backend-requests/schools";
const CreateSchoolForm = function ({ }) {
    const [selectedProgram, setSelectedProgram] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState(null);
    const programs = ['Math', 'Online', 'Outside'];

    const programElements = [];
    programs.map((element) => {
        programElements.push(<MenuItem value={element} key={element}>{element}</MenuItem>)
    })


    async function postSchool(e) {
        e.preventDefault();
        let name = document.querySelector('#school-name').value; //always a string
        let numberOfStudents = Number(document.querySelector('#school-students').value); //always a number, think always an int
        let address = document.querySelector('#school-address').value; //always a string

        //if(Number.isInteger(numberOfStudents)) //in case not always int

        let result = await postSchools(name, address, numberOfStudents, selectedProgram); //guarnteed to work
        if (result.ok) {
            e.target.submit();
            window.alert('Successfully Created a School');
            setErrorMessage(null);
            

        }
        else {
            switch (result.status) {
                case 507: setErrorMessage('Number of Students is too high'); break;
                case 422: setErrorMessage("Invalid credentials"); break;
                default: setErrorMessage("Unkown error");
            }
        }

    }



    return (
        <form className="create-school-form" onSubmit={postSchool}>
            <header className="create-school-header">
                Create a School
            </header>
            <div className="school-form-name-students">
                <TextField id="school-name" label="Name" sx={{ alignSelf: 'center' }} variant="outlined" error={errorMessage != null} helperText={errorMessage != null && (<div>{errorMessage} </div>)} />
                <TextField id="school-students" label="Number of Students" sx={{ alignSelf: 'center' }} type={'number'} variant="outlined" error={errorMessage != null} helperText={errorMessage != null && (<div>{errorMessage} </div>)}/>
            </div>
            <TextField id="school-address" label="Address" variant="outlined" fullWidth error={errorMessage != null} helperText={errorMessage != null && (<div>{errorMessage} </div>)}/>
            <FormControl fullWidth>
                <InputLabel id="school-program-input" error={errorMessage != null} helperText={errorMessage != null && (<div>{errorMessage} </div>)}>Speciality Programs</InputLabel>
                <Select
                    labelId="school-program-label"
                    id="school-program"
                    label='Speciality Programs'
                    value={selectedProgram}
                    onChange={(event) => setSelectedProgram(event.target.value)}
                >
                    {programElements}


                </Select>
            </FormControl>

            <Button id="school-submit" type='form' sx={{ alignSelf: 'flex-start' }} variant="outlined" color="secondary"> Submit </Button>
        </form>
    )
}

export default CreateSchoolForm;