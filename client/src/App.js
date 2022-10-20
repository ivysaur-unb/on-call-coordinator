import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AbsenceSchedule from './page/AbsenceSchedule';
function App() {

  return (
   <div>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><a href='/teacherAbsences'>Teacher Absences</a></li>
              <li><a href='/importAbsences'>Import Absences</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>

        </Routes>
      </Router>
   </div> 

  )

}

export default App;
