export async function getSchedule(email){
    const options = {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            email: email
        }
    }
    return await fetch('/schedules/teacher', options);
}


export async function getTeachables(email){
    const options = {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            email: email
        }
    }
    return await fetch('/teachers/teachables', options);
}