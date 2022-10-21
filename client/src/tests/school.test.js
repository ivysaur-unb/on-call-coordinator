const { SchoolOutlined } = require("@mui/icons-material");

const testSchoolName= 'asdgmnktbkbnthvmhkfgnf'



test('add school', async function(){
    const options = {
        method: 'POST',
        body: JSON.stringify ({
            name: testSchoolName,
            address: "address",
            numberOfStudents: 15,
            specialityPrograms: 'Math'
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }


    

    let postResponse = await fetch('http://localhost:3000/schools',options);
    expect(postResponse.status).toBe(200);


    let getRepsonse = await fetch('http://localhost:3000/schools');
    let getRepsonseJson = await getRepsonse.json();
    
    getRepsonseJson = getRepsonseJson.filter( (school)=>{
        return school.name === testSchoolName;
    })

    console.log(getRepsonseJson);
    expect(getRepsonseJson.length).toBeGreaterThan(0);


    
    const deleteOption={
        method: 'DELETE',
        body: JSON.stringify ({
            id: getRepsonseJson[0].id
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }

    //console.log(getRepsonseJson[0].id);

    let cleanUp = await fetch('http://localhost:3000/schools',deleteOption);
    expect(cleanUp.status).toBe(200);

})

