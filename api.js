var api = {};
var express = require('express');
var utils   = require('./utils');
var cradle  = require('cradle');
var config  = require('./config');
var moment  = require('moment');
var jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API

// =============================================================================
api.router = express.Router();          // get an instance of the express api.router


api.router.post('/authenticate', function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if(username === '' || password === '') {
        res.json({ success: false, message: 'Username and Password are required.' });
    }

    var dbb = new config.db();
    dbb.view('auth/users', {key: username.toLowerCase()}, function (err, data) {
      if (err) {
        if (err) throw err;
      } else {
        if(data.length == 0) {
            res.json({ success: false, message: 'Username and Password are not a match' });
            return;
        }
        else {
           var user = data[0].value;
        }
        if(user.password !== password) {
            res.json({ success: false, message: 'Username and Password are not a match' });
            return;
        }
        var tokenuser = {username: user.name};
        var token = jwt.sign(tokenuser, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          username: user.name,
          token: token
        });
      }
    });
});

api.router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

api.router.post('/', function (req, res) {
    console.log('post api send to slack: ' + req.body);
    utils.sendSlackText(req.body);
    res.status(200).end();
});

api.router.get('/data/team', function (req, res) {
    var dbb = new config.db();
    dbb.view('stats/teams', {group: true, reduce: true}, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
});

api.router.get('/data/foosball', function (req, res) {
    var dbb = new config.db();
    dbb.view('stats/foosball', function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
});

api.router.get('/data/paircounts', function (req, res) {
    var dbb = new config.db();
    dbb.view('stats/paircounts', {group: true, reduce: true}, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
});

api.router.post('/moveToCloud', function (req, res) {
    utils.moveToCloud(req.body.name);
    res.status(200).end();
});

api.router.post('/savePair', function (req, res) {
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

api.router.post('/moveToDev', function (req, res) {
    utils.moveToDev(req.body.name)
    res.status(200).end()
});

module.exports = api;