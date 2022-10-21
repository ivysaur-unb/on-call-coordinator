//import React, { useEffect, useState} from 'react';
import {TeacherProfile} from './TeacherProfile';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AbsenceSchedule from './AbsenceSchedule';
function App() {

  const [userData, setUserData] = useState([{}])

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

  return (
<<<<<<< HEAD
    <div className="App">
      <TeacherProfile/>
    </div>
  );
=======
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

>>>>>>> c4fa3768629ce7d2717825b25eae9e3a496619fd
}

export default App;
