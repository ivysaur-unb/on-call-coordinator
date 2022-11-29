export async function getTeachers(){
    const options = {
        method: 'POST',
        body: JSON.stringify ({
            //tId: teacherId
            //startDate: startDate,
            //endDate: endDate,
        }),
        headers: {
            "Content-Type" : "application/json",
            //"authorization": sessionStorage.getItem('token')       
        }
    }
    let response = await fetch('/onCalls/teachers', options)
    response = await response.json();
    return response;
}

export async function getTeacherOnCalls(teacherId){
    const options = {
        method: 'POST',
        body: JSON.stringify ({
            tId: teacherId
            //startDate: startDate,
            //endDate: endDate,
        }),
        headers: {
            "Content-Type" : "application/json",
            //"authorization": sessionStorage.getItem('token')       
        }
    }
    let response = await fetch('/onCalls', options)
    response = await response.json();
    return response;
}

export async function myOnCalls(teacherId){
    const options = {
        method: 'POST',
        body: JSON.stringify ({
            tId: teacherId
            //startDate: startDate,
            //endDate: endDate,
        }),
        headers: {
            "Content-Type" : "application/json",
            //"authorization": sessionStorage.getItem('token')       
        }
    }
    let response = await fetch('/onCalls/forTeachers', options)
    response = await response.json();
    return response;
}
