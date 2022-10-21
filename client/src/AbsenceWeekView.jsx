import React from 'react';
import AbsenceDayView from './AbsenceDayView'
const { TableRow, TableCell } = require("@mui/material");
class AbsenceWeekView extends React.Component {

    state = {
        weekStart: null,
        teacher: null,
    }

    constructor(props) {
        console.log({props: props})
        super(props);
        let weekStart;
        if(props.weekStart) {
            weekStart = new Date(props.weekStart);
            let dayOfWeek = weekStart.getUTCDay();
            if(dayOfWeek !== 1) {
                weekStart.setUTCDate(weekStart.getUTCDate() + (1 - dayOfWeek));
            } 
        }
        this.state = { 
            teacher: props.teacher ,
            weekStart: weekStart
        };
        
    }

    render() {
        console.log({state: this.state})
        let weekDay = this.state.weekStart;
        let days = []
        console.log({teacher: this.state.teacher})
        if(!this.state.teacher) {
            return null;
        }
        
        for(let i = 0; i < 5; i++) {
            weekDay.setUTCDate(this.state.weekStart.getUTCDate() + i)
            console.log(weekDay);
            days.push(<AbsenceDayView absences={this.state.teacher.Absence.filter(x => new Date(x.day).toDateString() === weekDay.toDateString())}></AbsenceDayView>)
        }
        return (
            <TableRow>
                <TableCell>{this.state.teacher.user.name}</TableCell>
                {days}
            </TableRow>    
        );
    }


}

export default AbsenceWeekView;