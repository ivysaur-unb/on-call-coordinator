

export function postAbsences(teacherId, period, day){

    const options = {
        method: 'POST',
        body: JSON.stringify ({
            teacherId: teacherId,
            day: day,
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
