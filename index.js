var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var utils       = require('./utils.js');
var api         = require('./api');
var config      = require('./config');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

app.set('port', config.PORT );
app.set('supreSecret', config.secret);
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});
/*
app.get('/', function (request, response) {
  var schema = request.headers['x-forwarded-proto'];
  if (config.isProd && schema === 'http') {
    response.redirect('https://' + request.headers.host + request.url);
  }
  utils.checktoken(request.query.token, response, (function () {
    response.sendfile('/some.html', {root: __dirname + "/public"});
  }));
});
*/

// all of our routes will be prefixed with /api
app.use('/api', api.router);

app.listen(config.port, '0.0.0.0', function () {
  console.log('Node app is running on port', config.port);
});
