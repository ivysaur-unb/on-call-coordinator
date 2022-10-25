import React from 'react';
import AbsenceDayView from './AbsenceDayView'
const { TableRow, TableCell } = require("@mui/material");
//class AbsenceWeekView extends React.Component {

    // IVYSAUR-53 required changes:
    //  Include WeekControl
    //  Teacher table should update on change to current week
    //  Should automatically load current week's absences from DB on component mount
    //  Filterable (e.g. by teacher name):
    //      Search bar to the left of teacher table
    //      autocomplete suggestions as possible quality-of-life improvement, but depends on effort required
    //  Each teacher needs an edit ('✏') button:
    //      Edit button opens teacherAbsences component
    //      Controls for setting absences should only be enabled for future periods
    //      After saving changes to teacherAbsences table is updated to match
    //  Separate OA and Teacher functionality:
    //      For OA: All teachers can be edited 
    //      For teacher: View is restricted to their own absences

    export default function AbsenceWeekView() {
        const rows = [{id:1, day: "2022-10-20 00:00:00.000", period: 1, teacherId: 1},
        {id:2, day: "2022-10-21 00:00:00.000", period: 3, teacherId: 1}
    ]
        return (
            <TableRow>
             <TableCell>{"M"}</TableCell>
             <TableCell>{"T"}</TableCell>
             <TableCell>{"W"}</TableCell>
             <TableCell>{"Th"}</TableCell>
             <TableCell>{"F"}</TableCell>
            </TableRow>
        );
      }

    // state = {
    //     weekStart: null,
    //     teacher: null,
    // }

    // constructor(props) {
    //     console.log({props: props})
    //     super(props);
    //     let weekStart;
    //     if(props.weekStart) {
    //         weekStart = new Date(props.weekStart);
    //         let dayOfWeek = weekStart.getUTCDay();
    //         if(dayOfWeek !== 1) {
    //             weekStart.setUTCDate(weekStart.getUTCDate() + (1 - dayOfWeek));
    //         } 
    //     }
    //     this.state = { 
    //         teacher: props.teacher ,
    //         weekStart: weekStart
    //     };
        
    // }

    // render() {
    //     console.log({state: this.state})
    //     let weekDay = this.state.weekStart;
    //     let days = []
    //     console.log({teacher: this.state.teacher})
    //     if(!this.state.teacher) {
    //         return null;
    //     }
        
    //     for(let i = 0; i < 5; i++) {
    //         weekDay.setUTCDate(this.state.weekStart.getUTCDate() + i)
    //         console.log(weekDay);
    //         days.push(<AbsenceDayView absences={this.state.teacher.absences.filter(x => new Date(x.day).toDateString() === weekDay.toDateString())}></AbsenceDayView>)
    //     }
    //     return (
    //         <TableRow>
    //             <TableCell>{this.state.teacher.user.name}</TableCell>
    //             {days}
    //         </TableRow>    
    //     );
    // }


//}

//export default AbsenceWeekView;