

export async function postAbsences(teacherId, period, date){

    const options = {
        method: 'POST',
        body: JSON.stringify ({
            teacher: teacherId,
            day: date,
            period: period
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }



    fetch('/absences', options).then(response=>{
        console.log(response);
    })
    
}
