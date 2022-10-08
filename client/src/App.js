import { useState, useEffect } from 'react';
import Day from './components/day';
import TeacherAbsences from './page/teacherAbsences';
function App() {

  const [userData, setUserData] = useState([{}])

  // useEffect(() => {
  //   fetch("/users").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       console.log(data);
  //       // setUserData(data)
  //     }
  //   )
  // }, [userData])

  return (
   <div>
    <TeacherAbsences />
   </div> 
  )
}

export default App;
