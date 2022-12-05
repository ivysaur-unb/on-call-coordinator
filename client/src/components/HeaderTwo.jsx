import React from "react";
import { IconButton, ThemeProvider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../App';
import { useContext } from "react";
import { theme } from "../page/theme"
const HeaderTwo = function ({ }) {
    let user = useContext(UserContext);

    return (
        <ThemeProvider theme={theme}>
        <div className="header-two">
            <div></div>
            <div className="header-name">
                iSchedule
            </div>
            <a href='/' onClick={() => sessionStorage.setItem('token', null)}>
                Logout
                <IconButton ><LogoutIcon sx={{color:'white'}} /> </IconButton>
            </a>
        </div>
        </ThemeProvider>
    )
}

export default HeaderTwo;