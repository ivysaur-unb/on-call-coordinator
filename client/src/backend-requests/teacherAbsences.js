

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
