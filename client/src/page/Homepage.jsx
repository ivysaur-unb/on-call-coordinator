import React from "react";
import { auth } from "../backend-requests/login";
import { Button } from "@mui/material";
import { useContext } from "react";
import {UserContext} from '../App'

const HomePage = function({}){
    const user = useContext(UserContext);

    return(
        <div> 
            {user.name}
            
        </div>
    )
}

export default HomePage;