var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser');
var p = require('./pairpicker.js');
var utils = require('./utils.js');
var cookieParser = require('cookie-parser');

var dbname = 'dev_data';
var cradle = require('cradle');
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

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();          // get an instance of the express Router
router.get('/', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var pairings = p.generatePairs(p.getNames(devs.devs), []);
    utils.sendSlackText(pairings);
    res.status(200).end();
  }));
});

router.post('/', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    console.log('post api send to slack: ' + req.body);
    utils.sendSlackText(req.body);
    res.status(200).end();
  }));
});

router.get('/data/v5', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);
    dbb.get('devs', function (err, doc) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(doc.names);
      }
    });
  }));

});

router.get('/data/team', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);
    dbb.view('stats/teams', {group: true, reduce: true}, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
  }));

});

router.get('/data/paircounts', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);
    dbb.view('stats/paircounts', {group: true, reduce: true}, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
  }));

});

router.get('/data/oddcounts', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);
    dbb.view('stats/oddcounts', {group: true, reduce: true}, function (err, data, keys) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
  }));
});

router.get('/data/cloud', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);
    dbb.get('cloud', function (err, doc) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(doc.names);
      }
    });
  }));
});

router.post('/moveToCloud', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    utils.moveToCloud(req.body.name);
    res.status(200).end();
  }));
});

router.post('/savePair', function (req, res) {
  utils.checktoken(req.query.token, res, function () {
    var now = moment();
    var formatted = now.format('YYYY-MM-DD HH:mm:ss Z');
    var docs = [];

    req.body.randomPairs.forEach(p => {
      docs.push({timestamp: formatted, data: p.split(' :: ').sort(), doc_type: 'pairing'});
    });

    req.body.intentionalPairs.forEach(p => {
      docs.push({timestamp: formatted, data: p.split(' :: ').sort(), doc_type: 'intentional'});
    });

    req.body.odd.forEach(p => {
      docs.push({timestamp: formatted, data: p, doc_type: 'odd'});
    });

    var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);
    dbb.save(docs, function (err, doc) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        res.send(req.body);
      }
    });

  });
});

router.post('/moveToDev', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    utils.moveToDev(req.body.name)
    res.status(200).end()
  }));

});

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port, '0.0.0.0', function () {
  console.log('Node app is running on port', port);
});
