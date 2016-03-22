var utils = {};

var Slack = require('node-slack');
var slack = new Slack(process.env.heroku_hook);
var slack_token = process.env.slack_token;
var async = require('async');
var config = require('./config')
var cradle = require('cradle');
var fs = require('fs');

var mapnames = function(pairs) {
  return pairs.map(function(pair) {
    return pair.replace(" :: ", ",");
  }).join(" | ");
};

var mapodd = function(pairs) {
  if (pairs)
    return pairs.join(" | ");
  else
    return [];
};

utils.sendSlackText = function(parings) {
  console.log("utils send to slack " + parings);
  var randos = mapnames(parings.randomPairs);
  var intentional = mapnames(parings.intentionalPairs);
  var odders = mapodd(parings.odd);

  var msg = {
    "text": "Pair Assignement",
    "attachments": [
      {
        "fallback": "Pair Assignement",
        "color": "#D00000",
        "fields": []
      }
    ]
  };


  if (randos) {
    msg.attachments[0].fields.push({
      "title": "Random",
      "value": randos,
      "short": false
    });
  }

  if (intentional) {
    msg.attachments[0].fields.push({
      "title": "Intentional",
      "value": intentional,
      "short": false
    });
  }
  if (odders) {
    msg.attachments[0].fields.push({
      "title": "Odd",
      "value": odders,
      "short": false
    });
  }

  console.log(msg);
  slack.send(msg);
};

utils.checktoken = function(token, res, action) {
  if (token === undefined || token !== slack_token) {
    console.log('Invalid token');
    res.status(401).end('Invalid token');
  }
  else {
    //console.log('Valid token');
    action();
  }
};

var remove = function(name, array) {
  var move = {};
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i].name === name) {
      move = array[i];
      array.splice(i, 1);
      return move;
    }
  }
  console.log('removed ' + move);
};

var getDocs = function(calls) {
  ['cloud', 'devs'].forEach(function(name) {
    calls.push(function(callback) {
      var dbb = new config.db();
      dbb.get(name, function(err, doc) { // remember error first ;)
        if (err) {
          return callback(err);
        }
        callback(null, doc);
      });
    })
  });
};

var saveDocs = function(calls, docs) {
  docs.forEach(function(name) {
    calls.push(function(callback) {
      var dbb = new config.db();
      dbb.save(name, function(err, doc) { // remember error first ;)
        if (err) {
          return callback(err);
        }
        callback(null, doc);
      });
    })
  });
};

utils.moveToCloud = function(name) {

  var clouddoc, devsdoc = {};
  var calls = [];
  getDocs(calls);

  async.parallel(calls, function(err, result) {
    if (err)
      return console.log(err);

    clouddoc = result[0];
    devsdoc = result[1];

    var newdevs = devsdoc.names.filter(n => n.name === name).splice(0)[0];
    devsdoc.names = devsdoc.names.filter(n => n.name !== name).splice(0);

    clouddoc.names.push(newdevs);

    console.log(clouddoc);

    var saves = [];
    var docs = [];
    docs.push(devsdoc);
    docs.push(clouddoc);
    saveDocs(saves, docs);

    async.parallel(saves, function(err, result) {
      if (err)
        return console.log(err);
      console.log('All Saved');
    });
  });
};

utils.moveToDev = function(name) {
  var clouddoc, devsdoc = {};
  var calls = [];
  getDocs(calls);

  async.parallel(calls, function(err, result) {
    if (err)
      return console.log(err);

    clouddoc = result[0];
    devsdoc = result[1];

    var newdevs = clouddoc.names.filter(n => n.name === name).splice(0)[0];
    clouddoc.names = clouddoc.names.filter(n => n.name !== name).splice(0);

    devsdoc.names.push(newdevs);

    console.log(clouddoc);

    var saves = [];
    var docs = [];
    docs.push(devsdoc);
    docs.push(clouddoc);
    saveDocs(saves, docs);

    async.parallel(saves, function(err, result) {
      if (err)
        return console.log(err);
      console.log('All Saved');
    });
  });
};

module.exports = utils;
