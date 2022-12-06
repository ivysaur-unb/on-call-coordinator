export async function postSchedules(formData){

    const options = {
        method: 'POST',
        body: formData,
        headers: {
            "Authorization" : sessionStorage.getItem('token'),
        }
    }
//
    return await fetch('/schedules', options);
}

export async function getSchedules(){
    const options = {
        method: 'GET',
        headers: {
            "Authorization" : sessionStorage.getItem('token'),
        }
    }
    return await fetch('/schedules/getSchedules',options);
}
//TO DO: getSchedule
//create new route for this call
//in server, create select query for schedule/scheduled classes? 
//new jsx file to create page containing table
//add it to principal dashboard