import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import Board from './page/Board';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AbsenceSchedule from './page/AbsenceSchedule';
import Dropdown from './components/dropdown';
import Header from './components/header';
import Login from './page/loginPage'
import TeacherDashboard from './page/teacherDashboard';
import AdminDashboard from './page/adminDashboard';
import PrincipalDashboard from './page/principalDashboard';

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
              <li><a href='/importAbsences'>Import Absences</a></li>
              <li><a href='/board'>Board</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
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
