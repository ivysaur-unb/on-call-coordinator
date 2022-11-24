import React from "react";
import { IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../App';
import { useContext } from "react";
const HeaderTwo = function ({ }) {
    let user = useContext(UserContext);

    return (
        <div className="header-two">
            <div></div>
            <div className="header-name">
                iSchedule
            </div>
            <a href='/' onClick={() => sessionStorage.setItem('token', null)}>
                Logout
                <IconButton ><LogoutIcon /> </IconButton>
            </a>
        </div>
    )
}

export default HeaderTwo;