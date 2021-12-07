var createError = require('http-errors');
var express = require('express');
var path = require('path');
const hbs = require('hbs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./components/products/index');
var addRouter = require('./routes/productAdd')
var createAcc = require('./components/user/createAccount')
var app = express();


const bodyparser = require('body-parser');
// view engine setup
// const pagination=require('./components/helper/pagination-helper')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// hbs.registerHelper('pagination',pagination);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/productAdd/editProduct", express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({
    extended :true
}));
app.use(bodyparser.json());

app.use("/productAdd",addRouter);
app.use('/', indexRouter);
app.use("/products",productRouter);
app.use('/users', usersRouter);
app.use('/createAccount',createAcc);

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
