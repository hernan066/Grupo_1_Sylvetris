var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');

const methodOverride = require('method-override'); 
const session = require('express-session');

const localsUserCheck = require('./middlewares/localsUserCheck');
const cookieCheck = require('./middlewares/cookieCheck');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var admRouter = require('./routes/adm');
var authRouter = require('./routes/auth');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(session({
  secret : 'askfjhah134654asDGGD$/aksjh',
  resave :false,
  saveUninitialized : true
})); 

app.use(cookieCheck);
app.use(localsUserCheck);

app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/usuario', usersRouter);
app.use('/admin', admRouter);
app.use('/auth', authRouter);


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