import React from 'react';
import { auth } from '../backend-requests/login';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../App';
import AdminDashboard from './adminDashboard';
import TeacherDashboard from './teacherDashboard';
import PrincipalDashboard from './principalDashboard';
import Login from './loginPage';
import HeaderTwo from '../components/HeaderTwo';
import { Stack } from '@mui/system';
const HomePage = function ({}) {
    const user = useContext(UserContext);

    if (user == null) {
        return <Login />;
    }

    switch (user.role) {
        case 'ADMIN':
            return (
                <div className="homepage-wrapper">
                    <HeaderTwo />
                    <AdminDashboard />
                </div>
            );

        case 'TEACHER':
            return (
                <div className="homepage-wrapper">
                    <HeaderTwo />
                    <TeacherDashboard />
                </div>
            );
        case 'VICE_PRINCIPAL':
            return (
                <div className="homepage-wrapper">
                    <HeaderTwo />
                    <PrincipalDashboard />
                </div>
            );
        default:
            return <Login />;
    }
};

export default HomePage;
