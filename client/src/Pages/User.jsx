import React from "react";
import { useState, useEffect } from 'react';

import CreateUser from "../components/CreateUser";
import ViewUsers from "../components/ViewUsers";
import styled from 'styled-components'

const User = function({}){
    const [displayUsers, setDisplayUsers] = useState(false);

    const Div2 = styled.div`
    display:flex;
    flex-direction: column;
    gap:50px;
    background-color: orange;
    width:100%;
    min-height:100%;
    justify-content:flex-start;
    align-items:center;
    padding-top: 15%;
    height:fit-content;
    
`
    return(
        <Div2>
              <CreateUser />
              <button onClick={()=>setDisplayUsers(!displayUsers)}>View users</button>
              <ViewUsers display={displayUsers}/>
        </Div2>
    )

}

export default User;