import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import LandingPage from './containers/LandingPage/LandingPage';
//import TeacherProfile from './TeacherProfile.js';

//const LandingPage = loadable(() => import('./containers/LandingPage/LandingPage'));
const TeacherProfile = loadable(() => import('./containers/TeacherProfile/TeacherProfile'));

export default function RoutesYuh() {
    return (
        <Routes>
            <Route exact path="/">
                <LandingPage/>
            </Route>
            <Route exact path="/addteacher">
                <TeacherProfile/>
            </Route>
        </Routes>
    );
}