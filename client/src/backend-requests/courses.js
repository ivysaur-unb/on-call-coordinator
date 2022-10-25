
export async function postCourses(teachable, courseCode, title, grade, pathway){

    const options = {
        method: 'POST',
        body: JSON.stringify ({
            teachable: teachable,
            courseCode: courseCode,
            title: title,
            grade: grade,
            pathway: pathway
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    }



    return fetch('/courses', options)
    
}