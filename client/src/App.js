import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import SchoolSchedule from './page/schoolSchedule';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {

  return (
   <div>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><a href='/teacherAbsences'>Teacher Absences</a></li>
              <li><a href='/schoolSchedule'>School Schedule</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
          <Route path='/schoolSchedule' element={<SchoolSchedule/>}/>

        </Routes>
      </Router>
   </div> 

  )

}

export default App;
