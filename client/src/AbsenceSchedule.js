import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
class AbsenceSchedule extends React.Component {

  state = {
    selectedFile: null,
    teachers: null,
    errors: []
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
          this.setState({ teachers: data.teachers });
        }
      });
  }

  render() {
    return (
      <div className="ImportScheduleForm">
          <Button variant="contained" component="label">
            Upload
            <input hidden accept=".xlsx" type="file" name="data" onChange={this.onFileChange} />
          </Button>
          <p>{this.state.selectedFile ? (this.state.selectedFile.name) : null}</p>
          <ul>
            {this.state.teachers !== null ? this.state.teachers.map(x => {
              return <li>{x.initials}</li>
            }) : null}
          </ul>
      </div>
    );
  }
}

export default AbsenceSchedule;
