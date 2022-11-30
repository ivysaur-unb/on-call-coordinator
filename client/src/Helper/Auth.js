import { useState, useEffect } from "react";
import { auth } from "../backend-requests/login";

export const useAuth = function (handleError) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        auth(sessionStorage.getItem('token')).then(response => {
            if (response.ok) {
                response.json().then(response => {
                    setUser(response.user);
                    setLoading(false);
                })
            }
            else {
                setLoading(false);
                
            }
        })
    }, []);
    return [user, loading];
}

export const checkRole = function (user, expectedRole) {
    if (expectedRole.includes('ANY')) {
        return;
    }
    if(!(expectedRole.includes(user))){
        window.location.href = '/404';
    }
    
}
