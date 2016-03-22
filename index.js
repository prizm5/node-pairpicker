var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser');
var p = require('./pairpicker.js');
var utils = require('./utils.js');
var cookieParser = require('cookie-parser');
var config = require('./config')
var cradle = require('cradle');
var api = require('./api');

var dbname = 'dev_data';
var db_url = process.env.dburl || 'http://localhost';
var db_port = process.env.dbport || 5984;
var port = process.env.port || app.get('port');
var async = require('async');

var isProd = process.env.isProd || true;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', function (request, response) {
  var schema = request.headers['x-forwarded-proto'];
  if (isProd && schema === 'http') {
    response.redirect('https://' + request.headers.host + request.url);
  }
  utils.checktoken(request.query.token, response, (function () {
    response.sendfile('/some.html', {root: __dirname + "/public"});
  }));
});



// all of our routes will be prefixed with /api
app.use('/api', api.router);

app.listen(port, '0.0.0.0', function () {
  console.log('Node app is running on port', port);
});
