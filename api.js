var api = {};
var express = require('express');
var utils = require('./utils');
var cradle = require('cradle');
var config = require('./config');
var moment = require('moment');

// ROUTES FOR OUR API
// =============================================================================
api.router = express.Router();          // get an instance of the express api.router

api.router.post('/', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    console.log('post api send to slack: ' + req.body);
    utils.sendSlackText(req.body);
    res.status(200).end();
  }));
});

api.router.get('/data/team', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new config.db();
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

api.router.get('/data/foosball', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new config.db();
    dbb.view('stats/foosball', function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
  }));
});

api.router.get('/data/pairdetails', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new config.db();
    dbb.view('stats/paircounts', {group: false, reduce: false}, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
  }));
});
api.router.get('/data/paircounts', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    var dbb = new config.db();
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

api.router.post('/moveToCloud', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    utils.moveToCloud(req.body.name);
    res.status(200).end();
  }));
});

api.router.post('/savePair', function (req, res) {
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

    var dbb = new config.db();
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

api.router.post('/moveToDev', function (req, res) {
  utils.checktoken(req.query.token, res, (function () {
    utils.moveToDev(req.body.name)
    res.status(200).end()
  }));
});

module.exports = api;