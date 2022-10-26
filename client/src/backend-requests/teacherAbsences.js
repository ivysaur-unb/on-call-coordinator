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
            "Content-Type" : "application/json"
        }
    }
    return await fetch('/absences/update', options)
}
