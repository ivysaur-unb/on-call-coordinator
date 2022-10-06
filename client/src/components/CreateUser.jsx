import React from "react";
import styled from 'styled-components'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';


const Div2 = styled.div`
    display:flex;
    flex-direction: column;
    gap:50px;
    background-color: orange;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;
    
`

const CoolerForm = styled.form`
    display:flex;
    flex-direction:column;
    gap:25px;
`

const CoolorFormButton = styled.button`
    width:250px;
    height:25px;
`

const postUser = function(email,name){
    const options ={
        method: 'POST',
        body:JSON.stringify({
          email:email,
          name:name
        }),
        headers: {
          "Content-Type": "application/json"
        }
    }
    fetch('/users',options).then(response=>{
        console.log(response);
    });

}


const submitFunction = function(e){
    e.preventDefault();

    let emailVal = document.querySelector('#email').value;
    let nameVal = document.querySelector('#name').value;

    console.log(nameVal);
    console.log(emailVal);
    postUser(emailVal,nameVal);
}
const CreateUser = function(){
   

    return <div>
        <CoolerForm onSubmit={submitFunction}>
                <TextField id="name" label="name" variant="outlined" />

                 <TextField id="email" label="email" variant="outlined" />
           
            <div>
                <Button type="form" variant="outlined"> Submit </Button>
                <Button type="reset" variant="outlined"> Reset</Button>
            </div>
            
        </CoolerForm > 
    </div>
}

export default CreateUser;