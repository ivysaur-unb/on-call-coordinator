//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState} from 'react';
import {TeacherProfile} from './TeacherProfile';

function App() {

  const [userData, setUserData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        // setUserData(data)
      }
    )
  }, [userData])

  return (
    <div className="App">
      <TeacherProfile/>
    </div>
  );
}

export default App;
