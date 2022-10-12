

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
