import React from "react";
import { getSchedules } from "../backend-requests/schoolSchedule";
import { useState, useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';


function ViewMasterSchedule(){
    const [data,setData] = useState(null);
    const [rows,setRows] = useState([]);
    const [check,setCheck] = useState(0);

    const columns = [
    { field: 'id', headerName: 'ID', headerClassName: "header", width: 70 },
    { field: 'initials', headerName: 'Teacher', headerClassName: "header",width: 100 },
    { field: 'title', headerName: 'Course Title',headerClassName: "header", width: 250 },
    { field: 'courseCode', headerName: 'Course Code',headerClassName: "header", width: 130 },
    { field: 'period', headerName: 'Period',headerClassName: "header", width: 100 },
    { field: 'location', headerName: 'Location',headerClassName: "header", width: 130 },  
    ];
    function getSchedule (){
        getSchedules().then(response => response.json()).then(dataIn => {setData(dataIn)})
        if(check === 0){
            setCheck(1);
        }
    }

    function filterSchedule(data){
        let temprows = [];
        if(data){
            for(let i = 0; i < data.length;i++){
                let schedule = data[i];
                let clas = schedule.classes;
                for(let j = 0; j < clas.length;j++){
                    let title = "";
                    let courseCode = "";
                    let c = clas[j].class;
                    (c) ? (title = c.title) : (title = "");
                    (c) ? (courseCode = c.courseCode) : (courseCode = "");
                    temprows.push({"id": clas[j].id,"initials": schedule.teacher.initials, "title": title, "courseCode": courseCode,
                    "period": clas[j].period, "location": clas[j].location});                
                }
            }
        }
        return temprows;
    }
    
    useEffect(() => {
        getSchedule();
    },[check])
    useEffect(() => {
        setRows(filterSchedule(data));
    },[data])
    return(
        <div style={{ "& .header": {backgroundColor: "#a1f0ee"},
        position: "absolute" , height: '90vh', width: '95vh', left: "15%"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={5}
                // rowsPerPageOptions={[10]}
                // checkboxSelection
            />
        </div>
    )
}
export default ViewMasterSchedule;