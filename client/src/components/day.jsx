import React, {useState, useEffect} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../page/teacherAbsences.css';


const Day = function({weekDay, disabled, initialAbsences}) {

    const [periods, setPeriods] = useState([]);
    
    const [checks, setChecks] = useState([false,false,false,false]);

    useEffect(() => {
        setChecks(prevChecks => prevChecks.map((chk, index) => {
            return (initialAbsences && initialAbsences.some(x => x.period === index+1)) || false
        }))
    }, [initialAbsences])

    useEffect(() => {
        let checkboxes = [];
        for (let i = 1; i < 5; i++){
            checkboxes.push(<FormControlLabel
            sx={{
                margin:0
            }}
            value={`${weekDay}-${i}`}
            control={<Checkbox   />}
            label={`P${i}`}
            checked={checks && checks[i-1]}
            onChange={(e) => {
                setChecks(checks.map((chk, index) => index === i-1 ? e.target.checked : chk))
            }}
            labelPlacement="top"
            className="teacherAbsences-checkbox"
            disabled={disabled}
            // onClick={(e) => {
            //     setChecks((prevChecks) => {
            //         prevChecks[i] = e.target.checked ; 
            //         return prevChecks;
            //     })
            // }}
            key={`${weekDay}-${i}`}
            name={`${weekDay}-${i}`}
        />)
        
    }
    setPeriods(checkboxes)
        }, [checks, weekDay, disabled])
    return (

        <div className='teacherAbsences-week' >
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