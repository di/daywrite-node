var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var debug = require('debug')('daywrite');

var app = express();
app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'app/views'));

var env = nunjucks.configure(app.get('views'), {
    autoescape: true,
    express:    app
});

app.set('view engine', 'nunjucks');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Routes
var index = require('./app/routes/index');
app.use('/', index);

var login = require('./app/routes/login');
app.use('/login', login);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
