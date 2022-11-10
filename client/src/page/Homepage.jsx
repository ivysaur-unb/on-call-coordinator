import React from "react";
import { auth } from "../backend-requests/login";
import { Button } from "@mui/material";
import { useContext } from "react";
import {UserContext} from '../App'

const HomePage = function({}){
    const user = useContext(UserContext);

    switch(user.role){
        case 'ADMIN': return(
            <div>hello admin</div>
        )

        case 'TEACHER': return(
            <div>hello teacher</div>
        )
        case 'USER': return(
            <div>hello user</div>
        )
        default: return(
            <div>This is the default</div>
        )
    }

}

export default HomePage;