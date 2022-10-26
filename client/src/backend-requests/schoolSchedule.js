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