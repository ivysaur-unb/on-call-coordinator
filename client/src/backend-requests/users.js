export async function verifyUser(email, password){
    const options = {
        method: 'GET',
        body: JSON.stringify ({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return await fetch('/users/find', options);
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