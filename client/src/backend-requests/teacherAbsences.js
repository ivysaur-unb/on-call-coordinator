export async function getAbsences(teacherId,startDate,endDate){
    const options = {
        method: 'POST',
        body: JSON.stringify ({
            teacherId: teacherId,
            startDate: startDate,
            endDate: endDate,
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    let response = await fetch('/absences/teacherAbsences', options)
    response = await response.json();
    return response;
}

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



    return fetch('/absences', options)
    
}
