import * as React from 'react';
import { useState, useEffect } from 'react';

import CreateUser from "../components/CreateUser";
import ViewUsers from "../components/ViewUsers";
import styled from 'styled-components'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
const User = function({}){
    const [displayUsers, setDisplayUsers] = useState(false);

    const Div2 = styled.div`
    display:flex;
    flex-direction: column;
    gap:50px;
    width:100%;
    min-height:100%;
    justify-content:flex-start;
    align-items:center;
    padding-top: 15%;
    height:fit-content;
    
`//              <Button variant="outlined" onClick={()=>setDisplayUsers(!displayUsers)}>View users</Button>

    return(
        <Div2>
              <CreateUser />
              <Button variant="contained" onClick={()=>setDisplayUsers(!displayUsers)} endIcon={<AccountCircle/>}>View users</Button>
              <ViewUsers display={displayUsers}/>
        </Div2>
    )

}

export default User;