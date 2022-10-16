var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

//add mongoose and db connection url
var mongoose = require('mongoose');
var config = require('./config/globals');

//auth packages
var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var businessContactRouter = require('./routes/businessContacts')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//db connection
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) {
    console.log('Error connecting to database');
  } else {
    console.log('Connected to database');
  }
});

//auth setup
app.use(session({
  secret: 'assignment 2',
  saveUninitialized: false,
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/businessContacts',businessContactRouter)

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

module.exports = app;
