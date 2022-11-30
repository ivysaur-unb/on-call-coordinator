const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const teacherRouter = require('./routes/teachers');
const coursesRouter = require('./routes/courses');

var absenceRouter = require('./routes/absences');
var scheduleRouter = require('./routes/schedules');
var schoolRouter = require('./routes/schools');
var authRouter = require('./routes/auth');
var onCallRouter = require('./routes/onCall');
const { untokenify } = require('./persist/auth');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//User authentication
app.use((req,res,next) => {
  // Skip Authentication if this is a unit test
  if(process.env.NODE_ENV === 'test') {
    next();
    return;
  }
  if(req.url === "/auth") {
     next();
     return;
  }
  const token = req.headers['authorization'];
  if(!token) {
    res.status(403);
    res.send();
    return;
  }
  let user;
  try {
    user = untokenify(token);
  } catch (TokenExpiredError) {
    res.status(403);
    res.send();
    return;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/absences', absenceRouter);
app.use('/teachers', teacherRouter);
app.use('/courses', coursesRouter);
app.use('/schedules', scheduleRouter);
app.use('/schools',schoolRouter);
app.use('/auth',authRouter);
app.use('/onCall',onCallRouter);

// Production only: return React App for any route not recognized by Express
app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports= app;
