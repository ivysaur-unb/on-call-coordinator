import React, {useState, useEffect} from 'react';
import {getAbsences} from '../backend-requests/teacherAbsences';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function AbsenceWeekView({dateStart, onTeacherChange, teachers, onClick}){    
    // const [teachers, setTeachers] = useState([]);//saves teachers with their absences
    const [weekAbsences, setWeekAbsences] = useState([]);//saves filtered absences
    const [selectedTeacher, setSelectedTeacher] = useState(-1);
    //getAbsences takes in an array of teacherIds, the starting and ending dates to find 
    //teachers who have absences during those date ranges.
    useEffect(() => {setWeekAbsences(saveAbsences(teachers, dateStart))}, [teachers, dateStart]);//filters absences whenever new teachers/absences are  retrieved.
    useEffect(() => {
        if(!teachers) {return;}
        let teach = teachers.find(x => x.id === Number(selectedTeacher));
        onTeacherChange(teach || null);
    }, [selectedTeacher, teachers, onTeacherChange])

    const handleChange = (e) => {
        setSelectedTeacher(e.target.value);
    }
    return (
        <form style = {{display:"flex", alignItems: "center",justifycontent: "space-between", gap:"25px"}}>
            <div>
                 <h2 style = {{textAlign: "center"}}>Absence List</h2>
                 <br></br>
                 <div>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell>Monday</TableCell>
                                    <TableCell>Tuesday</TableCell>
                                    <TableCell>Wednesday</TableCell>
                                    <TableCell>Thursday</TableCell>
                                    <TableCell>Friday</TableCell>
                                    <TableCell>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teachers && weekAbsences.length > 0 ? teachers.map((absent,index) => {
                                    // if(weekAbsences.length === 0){
                                    //     return null
                                    // }
                                    // else {
                                        return (
                                            <TableRow key={absent.id}>
                                                <TableCell>{absent.user.name}</TableCell>
                                                <TableCell>{weekAbsences[index][0]}</TableCell>
                                                <TableCell>{weekAbsences[index][1]}</TableCell>
                                                <TableCell>{weekAbsences[index][2]}</TableCell>
                                                <TableCell>{weekAbsences[index][3]}</TableCell>
                                                <TableCell>{weekAbsences[index][4]}</TableCell>
                                                <TableCell><label >Edit <input type="button" value={absent.id} onClick={(e) => {
                                                    handleChange(e);
                                                    onClick(e);
                                                }}/></label></TableCell>
                                            </TableRow>   
                                        )
                                //    }
                                }): null
                                }
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
    if(!absences || absences.length === 0){
        return [];
    }
    let tempArr = [];
    let string1 = 'Period: ';
    let string2 = 'Period: ';
    let string3 = 'Period: ';
    let string4 = 'Period: ';
    let string5 = 'Period: ';

    let nextDay = new Date(dateStart);
    let mon = new Date(nextDay);
    let tue = new Date(nextDay.setDate(nextDay.getDate() + 1));
    let wed = new Date(nextDay.setDate(nextDay.getDate() + 1));
    let thu = new Date(nextDay.setDate(nextDay.getDate() + 1));
    let fri = new Date(nextDay.setDate(nextDay.getDate() + 1));
    for(let i = 0; i < absences.length; i++){//each teacher in the array
        let item = absences[i].absences;
        for(let j = 0; j < item.length; j++){//each absent of a teacher
            let itemDate = new Date(item[j].day)
            if(itemDate.getDate() === mon.getDate()){
                let str = ''+ item[j].period;
                string1 = string1.concat(' '+ str);
            }
            if(itemDate.getDate() === tue.getDate()){
                let str = ''+ item[j].period;
                string2 = string2.concat(' '+ str);
            }
            if(itemDate.getDate() === wed.getDate()){
                let str = '' + item[j].period;
                string3 = string3.concat(' '+ str);
            }
            if(itemDate.getDate() === thu.getDate()){
                let str = '' + item[j].period;
                string4 = string4.concat(' '+ str);
            }
            if(itemDate.getDate() === fri.getDate()){
                let str = ''+item[j].period;
                string5 = string5.concat(' '+ str);
            }
        }
        tempArr.push([string1,string2,string3,string4,string5]); 
        string1 = "";
        string2 = "";
        string3 = "";
        string4 = "";
        string5 = "";
        string1 = 'Period: ';
        string2 = 'Period: ';
        string3 = 'Period: ';
        string4 = 'Period: ';
        string5 = 'Period: ';
    }
    return tempArr
}