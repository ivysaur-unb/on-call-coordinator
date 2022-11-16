import { useState, useEffect,createContext} from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import SchoolSchedule from './page/schoolSchedule';
import Board from './page/Board';
<<<<<<< HEAD
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
=======
>>>>>>> main
import AbsenceSchedule from './page/AbsenceSchedule';
import UploadClasses from './page/UploadClasses/UploadClasses';
import { TeacherProfile } from './page/TeacherProfile/TeacherProfile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dropdown from './components/dropdown';
import Header from './components/header';
import Login from './page/loginPage'
import HomePage from './page/Homepage';
import Lost from './page/404';
import { useAuth } from './Helper/Auth';
export const UserContext = createContext('');

import TeacherDashboard from './page/teacherDashboard';
import AdminDashboard from './page/adminDashboard';
import PrincipalDashboard from './page/principalDashboard';

function App() {
  const [user,loading] = useAuth(()=>{if(document.URL.split('/').pop() != 'loginPage')window.location.href = '/loginPage'});

  if(loading){
    return <div>...</div>
  }
  return (
    <UserContext.Provider value={user}>
   <div>
    <Header/> 
   <div>
      <Router>
        <Routes>

          <Route path='/' element={<HomePage/>}/>
          <Route path='/teacherAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/importAbsences' element={<AbsenceSchedule/>}/>
          <Route path='/uploadClasses' element={<UploadClasses/>}/>
          <Route path='/addTeacher' element={<TeacherProfile/>}/>
          <Route path='/schoolSchedule' element={<SchoolSchedule/>}/>
          <Route path='/board' element={<Board/>} />
          <Route path='/loginPage' element={<Login/>}/>
          <Route path='*' element={<Lost/>} />
        </Routes>
      </Router>
   </div> 

   

   </div>
   </UserContext.Provider>

  )

}

export default App;