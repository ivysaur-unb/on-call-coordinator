const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  dest: "./public/uploads",
});
const prisma = require("../prismaClient");

/* Helper to get Initials */
const getInitials = function (name) {
  var names = name.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

/* GETs courses and returns them */
const getCourses = async function (courses) {
  const coursesExist = courses.filter(async (course) => {
    const courseRec = await prisma.course.findFirst({
      where: { name: course.name },
    });
    if (courseRec !== null) {
      return courseRec;
    }
  });
  return coursesExist;
};

/* GET Teachers. */
router.get("/", async function (req, res) {
  const allMyUsers = await prisma.user.findMany();
  res.send(allMyUsers);
});

/* CREATE Teacher */
router.post("/", upload.single("picture"), async function (req, res, next) {
  if (req.body) {
    const teachables = JSON.parse(req.body.teachables);
    try {
      const teacher = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
          role: "TEACHER",
          teacher: {
            create: {
              initials: getInitials(req.body.name),
              pictureUrl: req.file ? req.file.path.substring(
                req.file.path.indexOf("uploads")
              ) : null,
              teachable: {
                connect: teachables ? teachables.map(teachable => ({ name: teachable.label })) : []
              }
            },
            /*Course: { 
            [getCourses(req.body.courses)]
          }*/
          },
        },
      });
      res.send(teacher);
    } catch (e) {
      next(e);
    }

    //console.log(teacher);
  }
});

module.exports = router;
