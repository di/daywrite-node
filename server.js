var config = require('./config');
var sessions = require('./sessions');
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var mongoose = require('mongoose');

var debug = require('debug')('daywrite');

var app = express();

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  debug('Connecting to MongoDB server at ' + config.mongo_url);
  mongoose.connect(config.mongo_url, options);
};
connect();

mongoose.connection.on('error', debug);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (file.split('.').pop() === "js") require(__dirname + '/app/models/' + file);
});

app.set('views', path.join(__dirname, 'app/views'));

var env = nunjucks.configure(app.get('views'), {
    autoescape: true,
    express:    app
});

app.set('view engine', 'nunjucks');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookie_secret));
app.use(sessions(config.redis_url, config.cookie_secret));
app.use('/static', express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// Routes
var index = require('./app/routes/index');
app.use('/', index);

var login = require('./app/routes/login');
app.use('/login', login);

var server = app.listen(config.port, function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
