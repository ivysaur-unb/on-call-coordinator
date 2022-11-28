import React from "react";
import { auth } from "../backend-requests/login";
import { Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from '../App'
import AdminDashboard from "./adminDashboard";
import TeacherDashboard from "./teacherDashboard";
import PrincipalDashboard from "./principalDashboard";
import Login from "./loginPage";
import HeaderTwo from "../components/HeaderTwo";
const HomePage = function ({ }) {
    const user = useContext(UserContext);
    if (user == null) {
        return (
            <Login />
        )
    }

    switch (user.role) {
        case 'ADMIN': return (
            <>
                <HeaderTwo />
                <AdminDashboard />
            </>
        )

        case 'TEACHER': return (
            <>
                <HeaderTwo />
                <TeacherDashboard user={user}/>
            </>
        )
        case 'VICE_PRINCIPAL': return (
            <>
                <HeaderTwo />
                <PrincipalDashboard />
            </>
        )
        default: return (
            <Login />
        )
    }

}

export default HomePage;