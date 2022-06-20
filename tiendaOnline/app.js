var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const indexRouter = require("./routes/index")
const productosRouter = require("./routes/routeProducts")
const usuarioRouter = require("./routes/routeUser");
const { application } = require('express');
const session = require('express-session');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(session( { secret: "Nuestro mensaje secreto",
				resave: false,
				saveUninitialized: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))


app.use("/", indexRouter);
app.use("/productos", productosRouter);
app.use("/usuario", usuarioRouter);



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
  res.send('error');
});

module.exports = app;
