import "./UploadClasses.css";
import readXlsxFile from "read-excel-file";
import { postCourses } from "../../backend-requests/courses";
//import { createTeachables } from "../../../../server/helpers/createTeachables";

export default function UploadClasses() {
    const handleupload = (e) => {
        //createTeachables();
        console.log(e.target.files[0]);
        //console.log(e.target.files[0][1]);
        readXlsxFile(e.target.files[0]).then((rows) => {
            //console.log(rows[0][1]);
            console.log(rows.length);
            for(let i = 1; i < rows.length; i++) {
                //for(let j = 0; j < 5; j++) {
                    console.log(rows[i]);
                    postCourses(rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4]);
                    /*const options ={
                        method: 'POST',
                        body:JSON.stringify({
                        teachable: rows[i][0],
                        courseCode: rows[i][1],
                        title: rows[i][2],
                        grade: rows[i][3],
                        pathway: rows[i][4],
                        }),
                        headers: {
                        "Content-Type": "application/json"
                        }
                    }
                    fetch('/courses', options).then(response=>{
                        if(response.status === '400'){
                            this.setState({error: response.message});
                            this.handleError()
                        }
                    });*/
                //}
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