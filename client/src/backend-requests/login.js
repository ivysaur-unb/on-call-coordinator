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

    return await fetch('/auth', options)
    
}

export async function auth(token){  
    const options ={
        headers: {
            "authorization": token
        }
    }

    return fetch('/auth',options);
}
