import React from 'react';
import loadable from '@loadable/component';

//page loader api?

const LandingPage = loadable(() => import('./containers/LandingPage/LandingPage'));
const TeacherProfile = loadable(() => import('./containers/TeacherProfile/TeacherProfile'));

const routeConfiguration = () => {
    return [
      {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
      },
      {
        path: '/addteacher',
        name: 'AddTeacherPage',
        component: TeacherProfile,
      },
    ];
};

export default routeConfiguration;
