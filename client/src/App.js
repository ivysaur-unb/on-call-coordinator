import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import AbsenceSchedule from './AbsenceSchedule';
import UploadClasses from './page/UploadClasses/UploadClasses';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
   <div>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><a href='/teacherAbsences'>Teacher Absences</a></li>
              <li><a href='/importAbsences'>Import Absences</a></li>
              <li><a href='/uploadClasses'>Upload Classes</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/uploadClasses' element={<UploadClasses/>}/>

        </Routes>
      </Router>
   </div> 

  )

}

export default App;