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


export async function editUser(email, name, password){

    const options = {
        method: 'POST',
        body: JSON.stringify ({
            email: email,
            name: name,
            password: password
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return await fetch('/teachers/edit', options);
}