
import "./teacherDashboard.css";
import TeacherAbsences from "./teacherAbsences";

function TeacherDashboard(){
    return (
    <>
    <div class="sidenav">
    <h3>DASHBOARD</h3>
    <a target = "absences" href='/teacherAbsences'>Teacher Absences</a>
    </div>
        
    <div class="main">
        <iframe name = "absences"></iframe>
    </div>
  </>
  );
}
export default TeacherDashboard;