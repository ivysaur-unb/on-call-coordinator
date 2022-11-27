export async function postSchedules(formData){

    const options = {
        method: 'POST',
        body: formData,
        /*headers: {
            "Content-Type" : "application/json"
        }*/
    }
//
    return await fetch('/schedules', options);
}

export async function getSchedules(){
    const options = {
        method: 'GET',
    }
    return await fetch('/schedules/getSchedules',options);
}
//TO DO: getSchedule
//create new route for this call
//in server, create select query for schedule/scheduled classes? 
//new jsx file to create page containing table
//add it to principal dashboard