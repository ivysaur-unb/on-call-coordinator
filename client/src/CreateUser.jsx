import React from "react";
import styled from 'styled-components'


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
            <div>
                <label htmlFor='name'> Name </label>
                <input type='text' id='name'></input>
            </div>
            <div>
                <label htmlFor='email'> Email</label>
                <input type='text' id='email'></input>
            </div>
            <div>
                <button type="form"> Submit </button>
                <button type="reset"> Reset</button>
            </div>
            
        </CoolerForm > 
    </div>
}

export default CreateUser;