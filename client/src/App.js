import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import AbsenceSchedule from './AbsenceSchedule';
import UploadClasses from './page/UploadClasses/UploadClasses';
import { TeacherProfile } from './page/TeacherProfile/TeacherProfile';
import SchoolSchedule from './page/schoolSchedule';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  /*const [userData, setUserData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        // setUserData(data)
      }
    )
  }, [userData])*/

  return (
   <div>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><a href='/teacherAbsences'>Teacher Absences</a></li>
              <li><a href='/importAbsences'>Import Absences</a></li>
              <li><a href='/uploadClasses'>Upload Classes</a></li>
              <li><a href='/addTeacher'>Add Teacher</a></li>
              <li><a href='/schoolSchedule'>School Schedule</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/uploadClasses' element={<UploadClasses/>}/>
          <Route path='/addTeacher' element={<TeacherProfile/>}/>
          <Route path='/schoolSchedule' element={<SchoolSchedule/>}/>

        </Routes>
      </Router>
   </div> 

  )

}

export default App;