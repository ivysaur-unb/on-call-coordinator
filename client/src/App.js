import { useState, useEffect,createContext} from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import Board from './page/Board';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AbsenceSchedule from './page/AbsenceSchedule';
import Dropdown from './components/dropdown';
import Header from './components/header';
import Login from './page/loginPage'
import HomePage from './page/Homepage';
import Lost from './page/404';
import { useAuth } from './Helper/Auth';
export const UserContext = createContext('');


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
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
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
