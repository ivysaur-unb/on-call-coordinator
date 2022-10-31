import { RepeatOneSharp } from "@mui/icons-material";
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
                handleError();
            }
        })
    }, []);
    return [user, loading];
}

export const checkRole = function (user, expectedRole) {
    if (expectedRole == 'ANY') {
        return;
    }
    for (let i = 0; i < expectedRole.length; i++) {
        if (user.role != expectedRole[i]) {
            window.location.href = '/404';
        }
    }
}
