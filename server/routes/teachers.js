var express = require('express');
var router = express.Router();

const { teachables } = require('../init/teachables');
const { untokenify } = require('../persist/auth');
const prisma = require('../prismaClient');

/* Helper to get Initials */
const getInitials = function(name){
  var names = name.split(' '),
  initials = names[0].substring(0, 1).toUpperCase();
    
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

/* GETs courses and returns them */
const getCourses = async function(courses){
  const coursesExist = courses.filter(async(course) => {
    const courseRec = await prisma.course.findFirst({
      where: {name: course.name}
    });
    if(courseRec !== null){
      return courseRec;
    }
  });
  return coursesExist
}


/* GET Teachers. */
router.get('/', async function(req, res) {
    const allMyUsers = await prisma.user.findMany()
    res.send(allMyUsers);
});

/* CREATE Teacher */
router.post('/', async function(req,res,next){
  let teacher =  new Promise((res,resp)=>{
    return 'hello';
  })
  if(req.body){
    try{
      teacher = await prisma.user.create({data:{    
      email: req.body.email,
      name: req.body.name,
      role:'TEACHER',
      Teacher: {
        create: {
          initials: getInitials(req.body.name)},
          /*Course: { 
            [getCourses(req.body.courses)]
          }*/
        },
      
      }});
      res.send(teacher);
    } catch(e){
        res.status('400').send(e);
      }
    
    //console.log(teacher);
  }
  
});


/* GET a teacher's teachables */
router.get('/teachables', async function(req, res) {
  let error;
  //Check if valid user
  const user = untokenify(req.headers["authorization"]);
  if(!user || !user.email){
    let result = null;
    let error = "User not found"
    return res.send({result, error});
  }

  //Get a teachers teachables
  let result = await prisma.teacher.findFirst({
    where:{
      user:{
        email: user.email
      }
    },
    select:{
      teachable: {
        select:{
          name: true
        }
      }
    }
  });
  //if no teachables were found
  if(!result || result.length ===0){
    result = null;
    error = "Teachables not found"
    return res.send({result, error});
  }
  //if teachables were found
  res.send({result, error});
});

module.exports = router;