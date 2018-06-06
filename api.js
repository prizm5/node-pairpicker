var api = {};
var express = require('express');
var utils = require('./utils');
var cradle = require('cradle');
var config = require('./config');
var moment = require('moment');
var exec = require('child_process').exec;

// ROUTES FOR OUR API
// =============================================================================
api.router = express.Router();          // get an instance of the express api.router

api.router.get('/data/fullteam', function (req, res) {
    var dbb = new config.db();
    dbb.view('stats/teams', {}, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
});

api.router.get('/data/team', function (req, res) {
    var dbb = new config.db();
    dbb.view('stats/teams', {}, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data.filter( v => v.value.status ==='active'));
      }
    });
});

api.router.get('/data/last-paired', function (req, res) {
    var dbb = new config.db();
    dbb.get('last-paired', {group: false, reduce: false}, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
});

api.router.get('/data/pairdetails', function (req, res) {
    var dbb = new config.db();
    dbb.view('stats/paircounts', {group: false, reduce: false}, function (err, data) {
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
    dbb.view('stats/paircounts', {
      group: true,
      reduce: true
    }, function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.send(data);
      }
    });
});

api.router.post('/savePair', function (req, res) {
    var now = moment();
    var formatted = now.format('YYYY-MM-DD HH:mm:ss Z');
    var docs = [];
    var randomPairs = req.body.randomPairs;
    var intentionalPairs = req.body.intentionalPairs;
    var odds = req.body.odd;
    var lastPaired = {
        _id: 'last-paired',
        pairs: []
    }

    randomPairs.forEach(p => {
      let data = p.split(" :: ").sort();
      var pairing = {"pair" : p}
      lastPaired.pairs.push(pairing)
      docs.push({
        timestamp: formatted,
        data: data,
        doc_type: 'pairing'
      });
    });

    intentionalPairs.forEach(p => {
      let data = p.split(" :: ").sort();
      var pairing = {"pair" : p}
      lastPaired.pairs.push(pairing)
      docs.push({
        timestamp: formatted,
        data: data,
        doc_type: 'intentional'
      });
    });

    odds.forEach(p => {
      var pairing = {"pair" : p}
      lastPaired.pairs.push(pairing)
      docs.push({
        timestamp: formatted,
        data: p,
        doc_type: 'odd'
      });
    });

    var dbb = new config.db();
    dbb.save(docs, function (err, doc) {
      if (err) {
        console.log(err);
        res.send(500);
      } else {
        dbb.save(lastPaired, function (err, doc){
          if (err) { console.log(err); }
        });

        res.send(req.body);
      }
    });

});

api.router.post('/moveToCloud', function (req, res) {
    utils.moveToCloud(req.body.name);
    res.status(200).end();
});

api.router.post('/moveToDev', function (req, res) {
    utils.moveToDev(req.body.name);
    res.status(200).end()
});

// c9_host=redaypair.com pm2 start server.js --name cloud9 -- --listen 0.0.0.0 -a : -w /home/bitnami/stack/apps/c9-workspace --collab --packed

api.router.post('/startCloud9', function (req, res) {
  var cmd = 'pm2 start cloud9';
  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.log("Error starting ", error);
    }
    else{
      console.log("Cloud9 Started");
    }
    res.status(200).end()
  });
});
api.router.post('/stopCloud9', function (req, res) {
  var cmd = 'pm2 stop cloud9';
  exec(cmd, function(error, stdout, stderr) {
    if(error) {
      console.log("Error Stopping ", error);
    }
    else{
      console.log("Cloud9 Stopped");
    }
    res.status(200).end()
  });
});

var exec = require('child_process').exec;
api.router.get('/data/cloud9status', function (req, res) {
  var status = {status: "Offline"};
  exec('pm2 l | grep server', function (error, stdOut, stdErr) {
    if(stdErr){
      console.log(stdErr);
    }
    if (stdOut.includes("online")) {
      status = {status: "Online"}; 
    }
  });
  res.send(status);
});

module.exports = api;