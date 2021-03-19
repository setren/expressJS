var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//API
let comments = [
  {
    "name": "Satu",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 1
  }, {
    "name": "Dua",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 2
  }, {
    "name": "Tiga",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 3
  }, {
    "name": "Empat",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 4
  }, {
    "name": "Lima",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 5
  }, {
    "name": "Enam",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 6
  }, {
    "name": "Tujuh",
    "email": "aisetren@gmail.com",
    "body": "Assalamualaikum",
    "id": 7
  }
]
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
  return res.send(comments);
});
app.post('/', (req, res) => {
  return res.send(req.body);
});
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
