import "./UploadClasses.css";
import readXlsxFile from "read-excel-file";
import {useState} from 'react';
import { postCourses } from "../../backend-requests/courses";
import { postTeachables } from "../../backend-requests/courses";
import { getNumCourses } from "../../backend-requests/courses";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
//import { createTeachables } from "../../../../server/helpers/createTeachables";

export default function UploadClasses() {
    let numRowsExcel = 0;
    //const [numText, setLabelText] = useState
    const [labelText, setLabelText] = useState('')

    const handleupload = (e) => {
        //createTeachables();
        console.log(e.target.files[0]);
        postTeachables();
        let numPostedFront = 0;
        let numPostedBack = 0;
        //console.log(e.target.files[0][1]);
        readXlsxFile(e.target.files[0]).then((rows) => {
            //console.log(rows[0][1]);
            console.log(rows.length); //THIS NUM ROWS?
            const numRows = rows.length;
            let extras = 0;

            for(let i = 1; i < rows.length; i++) {
                //for(let j = 0; j < 5; j++) {
                    if(rows[i][1].length > 5) {
                        numPostedFront += 2;
                        console.log(rows[i]);
                        let firstCourseCode = rows[i][1].slice(0,5);
                        console.log(firstCourseCode);
                        postCourses(rows[i][0], firstCourseCode, rows[i][2], rows[i][3], rows[i][4]);

                        let numChars = rows[i][1].length;
                        let secondCourseCode = rows[i][1].slice(numChars-5,numChars);
                        console.log(secondCourseCode);
                        postCourses(rows[i][0], secondCourseCode, rows[i][2], rows[i][3], rows[i][4]);
                        extras += 1;
                    }
                    else {
                        //console.log(rows[i]);
                        numPostedFront++;
                        postCourses(rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4]);
                    }
                    console.log(numPostedFront);
            }
            console.log(getNumCourses());
            let rowsTotal = numRows - 1 + extras; //-1 for headings row
            setLabelText(rowsTotal + " Classes Uploaded");
            //console.log(numPostedBack);
        });
        //console.log(e.target.files[1][2]);
    };

    return (
        <div className="upload-courses-root">
            <Box className='box'>
                <h1>Upload Classes Excel File</h1>
                <Button variant="contained" component="label">
                        Upload
                        <input hidden accept=".xlsx" type="file" name="data" onChange={handleupload}/>
                </Button>
                <h3>{labelText}</h3>
            </Box>
        </div>
    );
}