import {TableCell} from '@mui/material';
import React from 'react';

class AbsenceDayView extends React.Component {
    // IVYSAUR-53 Required Changes:
    // Make this less ugly
    state = {
        absences: null,
    }

    constructor(props) {
        super(props);
        if(props.absences) {
            this.state = {
                absences:  props.absences
            };
        }
    }

    render() {
        return (
            <>
            <TableCell style={{backgroundColor: (this.isAbsentForPeriod(1) ? 'black' : 'white')}}></TableCell>
            <TableCell style={{backgroundColor: (this.isAbsentForPeriod(2) ? 'black' : 'white')}}></TableCell>
            <TableCell style={{backgroundColor: (this.isAbsentForPeriod(3) ? 'black' : 'white')}}></TableCell>
            <TableCell style={{backgroundColor: (this.isAbsentForPeriod(4) ? 'black' : 'white')}}></TableCell>
            </>
        )
    }

    isAbsentForPeriod(period) {
        if(!this.state.absences) {
            return false;
        }
        return this.state.absences.find(x => x.period === period) !== undefined;
    } 

}

export default AbsenceDayView;