import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import SchoolSchedule from './page/schoolSchedule';
import Board from './page/Board';
import AbsenceSchedule from './page/AbsenceSchedule';
import UploadClasses from './page/UploadClasses/UploadClasses';
import { TeacherProfile } from './page/TeacherProfile/TeacherProfile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dropdown from './components/dropdown';
import Header from './components/header';
import Login from './page/loginPage'
import TeacherDashboard from './page/teacherDashboard';
import AdminDashboard from './page/adminDashboard';
import PrincipalDashboard from './page/principalDashboard';

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
    <Header/> 
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
              <li><a href='/importAbsences'>Import Absences</a></li>
              <li><a href='/board'>Board</a></li>
            </ul>
          }/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/teacherAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/uploadClasses' element={<UploadClasses/>}/>
          <Route path='/addTeacher' element={<TeacherProfile/>}/>
          <Route path='/schoolSchedule' element={<SchoolSchedule/>}/>
          <Route path='/board' element={<Board/>} />

          <Route path='/loginPage' element={<Login/>}/>
          <Route path='/teacherDashboard' element={<TeacherDashboard/>}></Route>
          <Route path='/adminDashboard' element={<AdminDashboard/>}></Route>
          <Route path='/principalDashboard' element={<PrincipalDashboard/>}></Route>

        </Routes>
      </Router>
   </div> 

   

   </div>

  )

}

export default App;