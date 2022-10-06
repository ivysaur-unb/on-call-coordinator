import React, { useEffect, useState } from "react";

const ViewUsers = function({display}){
    console.log(display);
    var [loading,setLoading] = useState(true);
    var[data,setData] = useState([{}]);

   

    useEffect( ()=> {
    fetch("/users").then(
        response => response.json()
      ).then(
        data => {
          console.log(data);
          setLoading(false);
        setData(data);
        }
      )
    },[display]);
    

    if(!display){
        return <div>nothing</div>
    }

    if(loading){
        return <div>Loading...</div>
    }
    console.log("USERS");
    console.log(data);
    return(
        <div>
         {
            data.map((n,index)=>(
                <div key={index}>
                    <p>{n.name}</p>
                    <p>{n.email}</p>
                    <hr></hr>
                </div>
                
            ))
         }
        </div>
    )
}

export default ViewUsers;