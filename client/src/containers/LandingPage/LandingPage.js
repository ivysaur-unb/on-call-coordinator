import React from 'react';
import {Checkbox, FormControlLabel, FormGroup, TextField, FormLabel, Button, Autocomplete} from '@mui/material';
import css from './LandingPage.css';
import {Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import RoutesYuh from '../../RoutesYuh';
//import '../../App.css';

const LandingPage = () => {
    return (
        <div>
            <LinkContainer to="/addteacher">
                <NavItem>Add Teacher</NavItem>
            </LinkContainer>
        </div>
    );
};

export default LandingPage;