import React, { useState, useEffect } from "react";
import { getAbsences } from "../backend-requests/teacherAbsences";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function AbsenceWeekView({
  dateStart,
  onTeacherChange,
  teachers,
  onClick,
}) {
  // const [teachers, setTeachers] = useState([]);//saves teachers with their absences
  const [weekAbsences, setWeekAbsences] = useState([]); //saves filtered absences
  const [selectedTeacher, setSelectedTeacher] = useState(-1);
  //getAbsences takes in an array of teacherIds, the starting and ending dates to find
  //teachers who have absences during those date ranges.
  useEffect(() => {
    setWeekAbsences(saveAbsences(teachers, dateStart));
  }, [teachers, dateStart]); //filters absences whenever new teachers/absences are  retrieved.
  useEffect(() => {
    if (!teachers) {
      return;
    }
    let teach = teachers.find((x) => x.id === Number(selectedTeacher));
    onTeacherChange(teach || null);
  }, [selectedTeacher, teachers, onTeacherChange]);

  const handleChange = (teacherId) => {
    setSelectedTeacher(teacherId);
  };
  return (
    <form
      style={{
        display: "flex",
        flexGrow:'1',
        overflowY:'scroll',
        justifycontent: "space-between",
        gap: "25px",
      }}
    >
      {/*this div was causing the page to scroll*/ }
      <div style={{height:'0px'}}>
        {/* <h2 style = {{textAlign: "center"}}>Absence List</h2> */}
        <br></br>
        <div>
          <Table size="small" sx={{ width: "100%" }}>
            <TableHead sx={{ fontWeight: "bold" }}>
              <TableRow>
                <TableCell align={"center"} colSpan={1}>
                  Teacher
                </TableCell>
                <TableCell align={"center"} colSpan={1}>
                  Edit
                </TableCell>
                <TableCell align={"center"} colSpan={4}>
                  Monday
                </TableCell>
                <TableCell align={"center"} colSpan={4}>
                  Tuesday
                </TableCell>
                <TableCell align={"center"} colSpan={4}>
                  Wednesday
                </TableCell>
                <TableCell align={"center"} colSpan={4}>
                  Thursday
                </TableCell>
                <TableCell align={"center"} colSpan={4}>
                  Friday
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {[...Array(20)].map((e, i) => (
                  <TableCell key={i}>
                    P<sub>{(i % 4) + 1}</sub>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers
                ? teachers.map((absent, index) => {
                    // if(weekAbsences.length === 0){
                    //     return null
                    // }
                    // else {
                    return (
                      <TableRow key={absent.id}>
                        <TableCell>{absent.user.name}</TableCell>
                        <TableCell>
                          {/* <label style={{color:"blue",fontWeight:"bold"}}>Edit<input style={{display:"none"}} type="button" value={absent.id} onClick={(e) => {
                                            handleChange(e);
                                            onClick(e);
                                        }} /></label> */}
                          <IconButton
                            aria-label="edit absences"
                            color="primary"
                            
                            onClick={() => {
                              handleChange(absent.id);
                              onClick(absent.id);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        {[...Array(20)].map((e, i) => {
                          let day = new Date(dateStart);
                          day.setDate(day.getDate() + Math.floor(i / 4));
                          return (
                            <TableCell
                              key={i}
                            >{weekAbsences[absent.id] &&
                                weekAbsences[absent.id].some(
                                  (x) =>
                                    new Date(x.day).toDateString() ===
                                      day.toDateString() &&
                                    x.period === (i % 4) + 1
                                )
                                  ? "A"
                                  : ""}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                    //    }
                  })
                : null}
            </TableBody>
          </Table>
        </div>
      </div>
    </form>
  );
}

//Filters absences.
//Returns an array of arrays, each array belongs to a teacher
//which contains all their periods for a specific date.
const saveAbsences = (absences, dateStart) => {
  if (!absences || absences.length === 0) {
    return [];
  }

  let tempArr = {};
  // let string1 = 'Period: ';
  // let string2 = 'Period: ';
  // let string3 = 'Period: ';
  // let string4 = 'Period: ';
  // let string5 = 'Period: ';

  let nextDay = new Date(dateStart);
  nextDay.setHours(0, 0, 0);
  let fri = new Date(nextDay);
  fri.setDate(nextDay.getDate() + 5);
  fri.setHours(23, 59, 59);
  for (let i = 0; i < absences.length; i++) {
    //each teacher in the array
    let item = absences[i].absences;
    // for(let j = 0; j < item.length; j++){//each absent of a teacher
    //     let itemDate = new Date(item[j].day)
    //     if(itemDate.getDate() === mon.getDate()){
    //         // let str = ''+ item[j].period;
    //         // string1 = string1.concat(' '+ str);
    //     }
    //     if(itemDate.getDate() === tue.getDate()){
    //         let str = ''+ item[j].period;
    //         string2 = string2.concat(' '+ str);
    //     }
    //     if(itemDate.getDate() === wed.getDate()){
    //         let str = '' + item[j].period;
    //         string3 = string3.concat(' '+ str);
    //     }
    //     if(itemDate.getDate() === thu.getDate()){
    //         let str = '' + item[j].period;
    //         string4 = string4.concat(' '+ str);
    //     }
    //     if(itemDate.getDate() === fri.getDate()){
    //         let str = ''+item[j].period;
    //         string5 = string5.concat(' '+ str);
    //     }
    // }
    // console.log({ nextDay, fri, item });
    tempArr[absences[i].id] = item.filter(
      (x) => new Date(x.day) >= nextDay && new Date(x.day) <= fri
    );
    // tempArr.push([string1,string2,string3,string4,string5]);
    // string1 = "";
    // string2 = "";
    // string3 = "";
    // string4 = "";
    // string5 = "";
    // string1 = 'Period: ';
    // string2 = 'Period: ';
    // string3 = 'Period: ';
    // string4 = 'Period: ';
    // string5 = 'Period: ';
  }
//   console.log({ tempArr, absences });
  return tempArr;
};
