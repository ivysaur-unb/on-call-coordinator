const {getSchools, postSchools, deleteSchools, post }  =require('../routes/schools')
const testSchoolName= 'asdgmnktbkbnthvmhkfgnf'
const express = require( 'express' )
const { response } = require('express')


test('add school', async function(){
    const options = {
            name: testSchoolName,
            address: "address",
            numberOfStudents: 15,
            specialityPrograms: 'Math'
    }


    

    let postResponse = await postSchools(options);
    //on success the postSchools will return an object, otherwise it will return an error code (number)
    expect(typeof(postResponse)).toBe('object');


    let getRepsonse = await getSchools();
    
    getRepsonse = getRepsonse.filter( (school)=>{
        return school.name === testSchoolName;
    })

   
    expect(getRepsonse.length).toBe(1);


    
    const deleteOption={
        id: getRepsonse[0].id
    }


    let cleanUp = await deleteSchools(deleteOption);
    expect(cleanUp.name).toBe(testSchoolName);

})

