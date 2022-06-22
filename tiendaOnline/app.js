let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
var session = require('express-session')



let indexRouter = require("./routes/index")
let productosRouter = require("./routes/routeProducts")
let usuarioRouter = require("./routes/routeUser");


const db= (require('./database/models'))


var app = express();


// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'arribaBoca',
  resave: false,
  saveUninitialized: true
}))

app.use(function(req, res, next){
  res.locals.user = req.session.user

  return next()
})

app.use(function(req, res, next){
    //chequear que no tengamos usuario en sessión y si tengamos cookie
    if(req.session.user == undefined && req.cookies.userId !== undefined){
      //Buscar el usario de la base de datos
         db.User.findByPk(req.cookies.userId)
              .then(function(user){
                //Dentro del then pasar al usuario a req.session.user
                //Pasar al usuario locals.user
                // retornar next()
                  req.session.user = user
                  res.locals.user = user
                
                  return next()
  
              })
              .catch( error => console.log(error))
            } else { //tiene que haber un else
              return next()
            }
  })



app.use("/", indexRouter);
app.use("/productos", productosRouter);
app.use("/usuario", usuarioRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
}); */

module.exports = app;
