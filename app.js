var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyparser = require('body-parser');
var session =require('express-session');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cmdRouter = require('./routes/commande');

var app = express();
var  pdf = require('express-pdf');
app.use(pdf);

app.use('/pdfFromHTML', function(req, res){
    res.pdfFromHTML({
        filename: 'generated.pdf',
        html: path.resolve(__dirname, './template.html'),
        options: {}
});
});

app.use('/pdfFromHTMLString', function(req, res){
    res.pdfFromHTML({
        filename: 'generated.pdf',
        htmlContent: '<html><body></body></html>',
        options: {}
});
});

app.use('/pdf', function(req, res){
    res.pdf(path.resolve(__dirname, './original.pdf'));
})

var passport = require('passport');

var allowCrossDomain = function(req, res, next) {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
   next();
}

//Database
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());


app.use('/', indexRouter);
app.use('/commande',cmdRouter);
app.use('/users', usersRouter);

app.get('*', function(req,res){
    res.redirect('/');

});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});








app.use(allowCrossDomain);



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
