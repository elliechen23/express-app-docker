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
var orders = require('./routes/orders');
var admin = require('./routes/admin');

var app = express();

//CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
var cors = require('cors');
app.use(cors());

// Using queue middleware is Express middleware to limit a number of simultaneously processing requests using queue
var queue = require('express-queue');
//version 0.0.5
//app.use(queue({ activeLimit: 2 }));
// activeLimit - max request to process simultaneously
// May be also:
// app.get('/api', queue({ activeLimit: 2 })

//version 0.0.8
// Using queue middleware
app.use(queue({ activeLimit: 2, queuedLimit: -1 }));
// activeLimit - max request to process simultaneously
// queuedLimit - max requests in queue until reject (-1 means do not reject)
//
// May be also:
// app.get('/api', queue({ activeLimit: 2, queuedLimit: -1})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req,res,next){
  console.log('Time:' + moment().format()); //Date.now()
  next();
})



//http://localhost:3000
app.use('/', index);

//設定靜態檔案的資料夾
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static(__dirname + '/jquery'));

//http://localhost:3000/users
app.use('/api1', users);
app.use('/api2', books);
app.use('/api3', orders);

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
