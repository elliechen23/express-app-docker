var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var admin = require('./routes/admin');
var app = express();
//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
var cors = require('cors');
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  console.log('Time:' + moment().format()); //Date.now()
  next();
})



//http://localhost:3000
app.use('/', index);

//設定靜態檔案的資料夾
app.use(express.static(__dirname + '/jquery'));

//http://localhost:3000/users
app.use('/api1', users);
app.use('/api2', books);

//http://localhost:3000/api/users
//app.use('/api',users);

//http://localhost:3000/admin
app.use('/admin',admin);
//app.use('/app01',app01);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
