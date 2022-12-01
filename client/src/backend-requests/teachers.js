export async function getSchedule(){
    const options = {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "authorization": sessionStorage.getItem('token')   
        }
    }
    return await fetch('/schedules/teacher', options);
}


export async function getTeachables(){
    const options = {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "authorization": sessionStorage.getItem('token')   
        }
    }
    return await fetch('/teachers/teachables', options);
}