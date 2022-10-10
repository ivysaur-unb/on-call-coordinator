import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'
class AbsenceSchedule extends React.Component {

  state = {
    selectedFile: null
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
      .then(data => data);
  }

  render() {
    return (
      <div className="ImportScheduleForm">
          <Button variant="contained" component="label">
            Upload
            <input hidden accept=".xlsx" type="file" name="data" onChange={this.onFileChange} />
          </Button>
          <p>{this.state.selectedFile ? (this.state.selectedFile.name) : null}</p>
      </div>
    );
  }
}

export default AbsenceSchedule;
