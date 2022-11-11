import "./UploadClasses.css";
import readXlsxFile from "read-excel-file";
import { postCourses } from "../../backend-requests/courses";
import { postTeachables } from "../../backend-requests/courses";
//import { createTeachables } from "../../../../server/helpers/createTeachables";

export default function UploadClasses() {
    const handleupload = (e) => {
        //createTeachables();
        console.log(e.target.files[0]);
        postTeachables();
        //console.log(e.target.files[0][1]);
        readXlsxFile(e.target.files[0]).then((rows) => {
            //console.log(rows[0][1]);
            console.log(rows.length);
            for(let i = 1; i < rows.length; i++) {
                //for(let j = 0; j < 5; j++) {
                    if(rows[i][1].length > 5) {
                        console.log(rows[i]);
                        let firstCourseCode = rows[i][1].slice(0,5);
                        console.log(firstCourseCode);
                        postCourses(rows[i][0], firstCourseCode, rows[i][2], rows[i][3], rows[i][4]);

                        let numChars = rows[i][1].length;
                        let secondCourseCode = rows[i][1].slice(numChars-5,numChars);
                        console.log(secondCourseCode);
                        postCourses(rows[i][0], secondCourseCode, rows[i][2], rows[i][3], rows[i][4]);
                    }
                    else {
                        //console.log(rows[i]);
                        postCourses(rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4]);
                    }
            }
        });
        //console.log(e.target.files[1][2]);
    };

    return (
        <div className="root">
            <h1>Select Excel File</h1>
            <input type="file" id="file" onChange={handleupload} />
        </div>
    );
}