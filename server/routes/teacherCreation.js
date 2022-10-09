var express = require('express');
var router = express.Router();

/* GET TeacherProfile. */
router.get('/', function(req, res) {
    //res.send('Get route on teacher stuff');
    res.render('TeacherProfile', { title: 'Express' });
});

module.exports = router;