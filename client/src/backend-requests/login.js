export async function login(email, password){

    const options = {
        method: 'POST',
        body: JSON.stringify ({
            email:email,
            password:password
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }

    return await fetch('/users/login', options)
    
}
