import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {

  return (
    
   <div>
    <head> <title> On Call Coordinator </title> </head>
      <center>On Call Coordinator Landing Page</center>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><button href='/teacherAbsences'>Teacher Absences</button></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>

        </Routes>
      </Router>
   </div> 

  )

}

export default App;
