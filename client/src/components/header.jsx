import * as React from 'react';
import Button from '@mui/material/Button';
import Dropdown from './dropdown';
import '../page/homepage.css'
const Header = function () {

    const teacherLinks = [{name: "Teacher Absences", url: "/teacherAbsences"},
                         {name: "Teacher", url: "/cvghjiop"}]
return(  
<div className='header'>

    <Dropdown dropdownlist={teacherLinks} root="Teachers"> </Dropdown>
    <Dropdown dropdownlist={teacherLinks} root="Teachers"> </Dropdown>


</div>


)
}

export default Header;

