import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dropdown from './components/dropdown';
import Header from './components/header';
import Login from './page/loginPage'

function App() {

  return (
   <div>
    <Header/> 
    
   <div>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><a href='/teacherAbsences'>Teacher Absences</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>

          <Route path='/loginPage' element={<Login/>}/>

        </Routes>
      </Router>
   </div> 

   

   </div>

  )

}

export default App;
