import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import User from './Pages/User'


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
  }, [])

  //npm install react-router-dom
  //the elements within the route tag should be another react elemenet instead of what I did here
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<div>hello</div>} />
          <Route path='/users' element={<User />}/>
        
        </Routes>
      </Router>
    </div>
   
  );
}

export default App;



  /*
  fetch('/users',options).then(response=>{
    console.log(response.json().then(responseJ=>{
      console.log(responseJ);
    }));
    
  }); 
  */