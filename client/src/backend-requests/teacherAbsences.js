export async function getAbsences(startDate,endDate){
    const options = {
        method: 'POST',
        body: JSON.stringify ({
            startDate: startDate,
            endDate: endDate,
        }),
        headers: {
            "Content-Type" : "application/json",
            "authorization": sessionStorage.getItem('token')       
        }
    }
    let response = await fetch('/absences/teacherAbsences', options)
    response = await response.json();
    return response;
}

export async function postAbsence(teacherId, period, date){

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



    return await fetch('/absences', options)
    
}

export async function postAbsences(absences) {
    const options = {
        method: 'POST',
        body: JSON.stringify(absences),
        headers: {
            "Content-Type" : "application/json"
        }
    }
    return await fetch('/absences', options)
}

export async function updateAbsences(teacherAbsences) {
    const options = {
        method: 'POST',
        body: JSON.stringify(teacherAbsences),
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem('token')
        }
    }
    return await fetch('/absences/update', options)
}
