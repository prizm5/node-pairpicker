var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var utils = require('./utils.js');
var api = require('./api');
var config = require('./config');
var port = config.process_port(app);

app.set('port',port);
app.set('trust proxy', 1); // trust first proxy
app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(function (req, res, next) {
  var token = req.query.token;
  var cookie = req.cookies.safetoken;

  if ((cookie === undefined && token === undefined ) || 
   (token !== undefined && token !== config.token)) {
    res.send(401,'Invalid token');
  }
  else {
    if(cookie === undefined){
      res.cookie('safetoken',config.token, { expires: new Date(Date.now() + (100000*900000))});
    }
    next();
  }
});

app.get('/', function (req, res) {
  var schema = req.headers['x-forwarded-proto'];
  if (config.isProd && schema === 'http') {
    response.redirect('https://' + request.headers.host + request.url);
  }
  res.sendfile('/some.html', {root: __dirname + "/public"});
});

// all of our routes will be prefixed with /api
app.use('/api', api.router);

app.listen(port, '0.0.0.0', function () {
  console.log('Node app is running on port', port);
});
