import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Day = function({weekDay}) {

    const periods = [];

    for (let i = 1; i < 5; i++){
        periods.push(<FormControlLabel
            sx={{
                margin:0
            }}
            value={`${weekDay}-${i}`}
            control={<Checkbox />}
            label={`p${i}`}
            labelPlacement="top"
            className="teacherAbsences-checkbox"
            
        />)
    }
    return (

        <div>
            <div>
                {weekDay}
            </div>
            <div>
                {periods}
            </div>
        </div>

    );


}

export default Day;