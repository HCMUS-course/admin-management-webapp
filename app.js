const createError = require('http-errors');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')


const passport=require('./passport')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./components/product/index');
const authRouter=require("./components/auth/index")
const addRouter = require('./routes/productAdd')
const loggedInAdminGuard=require("./middlewares/loginAdminGuard")
var createAcc = require('./components/user/createAccount')
const app = express();


const bodyparser = require('body-parser');
// view engine setup
// const pagination=require('./components/helper/pagination-helper')
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, '/components/product/views'),
                  path.join(__dirname, '/components/auth/views'),
                
          ]);
app.set('view engine', 'hbs');
// hbs.registerHelper('pagination',pagination);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log( process.env.SESSION_SECRET);
app.use(session({ secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,}));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
  res.locals.user=req.user;
  next();
})
app.use(bodyparser.urlencoded({
    extended :true
}));
app.use(bodyparser.json());


app.use('/',authRouter)
app.use('/',loggedInAdminGuard, indexRouter);

app.use("/productAdd/editProduct", express.static(path.join(__dirname, "public")));
app.use("/productAdd",loggedInAdminGuard,addRouter);
app.use("/products",loggedInAdminGuard,productRouter);
app.use('/createAccount',createAcc);
// app.use('/users',loggedInAdminGuard, usersRouter);

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
