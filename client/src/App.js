import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {

  return (
   <div>
      <Router>
        <Routes>

          <Route path='/' element={<div>banana bread</div>}/>
          <Route path='/teacherAbsences' element={<TeacherAbsences/>}/>

        </Routes>
      </Router>
   </div> 

  )

}

export default App;
