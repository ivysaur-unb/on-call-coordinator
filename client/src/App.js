import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CreateUser from './CreateUser';
import ViewUsers from './ViewUsers';

const Div2 = styled.div`
    display:flex;
    flex-direction: column;
    gap:50px;
    background-color: orange;
    width:100%;
    min-height:100%;
    justify-content:flex-start;
    align-items:center;
    padding-top: 15%;
    height:fit-content;
    
`

function App() {
  const [displayUsers, setDisplayUsers] = useState(false);
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
          <Route path='/users' element={<Div2>
              <CreateUser />
              <button onClick={()=>setDisplayUsers(!displayUsers)}>View users</button>
              <ViewUsers display={displayUsers}/>
        </Div2>}/>
        
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