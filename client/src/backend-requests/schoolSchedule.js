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