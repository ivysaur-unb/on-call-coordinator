import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import Board from './page/Board';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {

  return (
   <div>
      <Router>
        <Routes>

          <Route path='/' element={
            <ul>
              <li><a href='/teacherAbsences'>Teacher Absences</a></li>
              <li><a href='/board'>Board</a></li>
            </ul>
          }/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>
          <Route path='/board' element={<Board/>} />

        </Routes>
      </Router>
   </div> 

  )

}

export default App;
