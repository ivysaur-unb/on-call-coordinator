var express = require('express');
var router = express.Router();

/* GET TeacherProfile. */
router.get('/teacherprofile', function(req, res, next) {
  res.render('TeacherProfile', { title: 'Express' });
});

module.exports = router;