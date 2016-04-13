var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var utils = require('./utils.js');
var cookieParser = require('cookie-parser');
var api = require('./api');
var config = require('./config');

var port = process.env.port || app.get('port') || 5000;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
 
app.get('/', function (request, response) {
  var schema = request.headers['x-forwarded-proto'];
  if (config.isProd && schema === 'http') {
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
