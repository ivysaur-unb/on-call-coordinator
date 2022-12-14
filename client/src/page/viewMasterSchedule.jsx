import React from "react";
import { getSchedules } from "../backend-requests/schoolSchedule";
import { useState, useEffect} from "react";
import { DataGrid } from '@mui/x-data-grid';


function ViewMasterSchedule(){
    const [data,setData] = useState(null);
    const [rows,setRows] = useState([]);

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
                    (c) ? (title = c.title) : (title = clas[j].specialCode);
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
    },[])
    useEffect(() => {
        setRows(filterSchedule(data));
    },[data])
    return(
        <div  style={
        {height: '90vh', width: '810px'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                density={'comfortable'}
                // pageSize={5}
                // rowsPerPageOptions={[10]}
                // checkboxSelection
            />
        </div>
    )
}
export default ViewMasterSchedule;