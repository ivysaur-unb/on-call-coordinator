import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AbsenceWeekView from '../components/AbsenceWeekView'
class AbsenceSchedule extends React.Component {

  state = {
    selectedFile: null,
    teachers: null,
    errors: [],
    weekStart: null,
    weekEnd: null,
  }

  onFileChange = event => {
    console.log({ event })
    this.setState({ selectedFile: event.target.files[0] })
    if (!event.target.files[0]) {return;}

    const formData = new FormData()
    formData.append("data", event.target.files[0])
    fetch('/absences/import', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if(data.createResult.errors.length > 0) {
          //Display errors
          this.setState({ errors: data.createResult.errors });
        }
        if(data.teachers) {
          //Display Teachers
          let weekStart = this.minDate(data.teachers);
          let weekEnd = new Date(weekStart);
          weekEnd.setUTCDate(weekStart.getUTCDate() + 4)
          console.log({teachers: data.teachers, weekStart: weekStart})
          this.setState({ teachers: data.teachers,
            weekStart: weekStart,
            weekEnd: weekEnd
           });
        }
      });
  }

  render() {
    return (
      <div className="ImportScheduleForm" >
          <Button variant="contained" component="label">
            Upload
            <input hidden accept=".xlsx" type="file" name="data" onChange={this.onFileChange} />
          </Button>
          <p>{this.state.selectedFile ? (this.state.selectedFile.name) : null}</p>
          {this.state.teachers ? (
            <>
            <h2 style={{textAlign: 'center'}}>{new Date(this.state.weekStart).toDateString()} - {new Date(this.state.weekEnd).toDateString()}</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={1}></TableCell>
                  <TableCell align='center' colSpan={4}>Monday</TableCell>
                  <TableCell align='center' colSpan={4}>Tuesday</TableCell>
                  <TableCell align='center' colSpan={4}>Wednesday</TableCell>
                  <TableCell align='center' colSpan={4}>Thursday</TableCell>
                  <TableCell align='center' colSpan={4}>Friday</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Teacher</TableCell>
                  <TableCell>P<sub>1</sub></TableCell>
                  <TableCell>P<sub>2</sub></TableCell>
                  <TableCell>P<sub>3</sub></TableCell>
                  <TableCell>P<sub>4</sub></TableCell>
                  <TableCell>P<sub>1</sub></TableCell>
                  <TableCell>P<sub>2</sub></TableCell>
                  <TableCell>P<sub>3</sub></TableCell>
                  <TableCell>P<sub>4</sub></TableCell>
                  <TableCell>P<sub>1</sub></TableCell>
                  <TableCell>P<sub>2</sub></TableCell>
                  <TableCell>P<sub>3</sub></TableCell>
                  <TableCell>P<sub>4</sub></TableCell>
                  <TableCell>P<sub>1</sub></TableCell>
                  <TableCell>P<sub>2</sub></TableCell>
                  <TableCell>P<sub>3</sub></TableCell>
                  <TableCell>P<sub>4</sub></TableCell>
                  <TableCell>P<sub>1</sub></TableCell>
                  <TableCell>P<sub>2</sub></TableCell>
                  <TableCell>P<sub>3</sub></TableCell>
                  <TableCell>P<sub>4</sub></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.teachers.map(teach => (
                  <AbsenceWeekView key={teach.id} teacher={teach} weekStart={this.state.weekStart} />
                ))}
              </TableBody>
            </Table>
            </>
          ) : null}
          {this.state.errors ? this.state.errors.map(err => {
            return <Alert severity="error">{err.message}</Alert>
          }) : null}
      </div>
    );
  }

  minDate(teachers) {
    console.log({teach: teachers[0]})
    let min = teachers[0].absences[0].day
    for(let teach of teachers) {
      let minForTeach = teach.absences.sort((a,b)=>a.day-b.day)[0];
      if(minForTeach < min) {
        min = minForTeach;
      }
    }
    let result = new Date(min);
    if(result.getDay() !== 1) {
      result.setDate(result.getDate() + (1 - result.getDay()))
    }
    return result;
  }
}

export default AbsenceSchedule;
