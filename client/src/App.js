//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState} from 'react';
import TeacherProfile from './containers/TeacherProfile/TeacherProfile';
import LandingPage from './containers/LandingPage/LandingPage';
import routeConfiguration from './routeConfiguration';
import RoutesYuh from './RoutesYuh';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";

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
      <LandingPage />
      <RoutesYuh/>
    </div>
  );
}

export default App;
