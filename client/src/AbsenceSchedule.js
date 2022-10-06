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
      this.setState({ selectedFile: event.target.files[0]})
      //TODO: Use this function to upload the spreadsheet without refreshing the page
      //Currently having issues with multipart form data not being submitted properly
      // if (!event.target.files[0]) {return;}
      
    //   const formData = new FormData()
    //   formData.append("data",event.target.files[0])
    //   console.log(event.target.files[0])
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'multipart/form-data'},
    //     body: formData,
    //   };
    // fetch('/schedule/import', requestOptions)
    //     .then(response => response.json())
    //     // .then(data => data);
  }

  render() {
    return (
      <div className="ImportScheduleForm">
        <form action="/schedule/import" method="post" encType='multipart/form-data'>
          <Button variant="contained" component="label">
            Upload
            <input hidden accept=".xlsx" type="file" name="data" onChange={this.onFileChange}/>
          </Button>
          <p>{this.state.selectedFile ? (this.state.selectedFile.name) : null}</p>
          <button type="submit" >submit</button>
        </form>

      </div>
    );
  }
}

export default AbsenceSchedule;
