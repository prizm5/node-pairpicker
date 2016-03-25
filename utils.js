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

var changeTeam = function(name,team){
  var dbb = new config.db();
  dbb.get("team", function(err, doc) { // remember error first ;)
    if (err) {
      return console.log(err);
    }
    doc.members.filter( f => f.name == name)[0].team = team;
    dbb.save(doc, function(err, doc) {
        if (err) {
          return callback(err);
        }
        return doc;
    });
  });
};

utils.moveToCloud = function(name) {
  return changeTeam(name,'Cloud');
};

utils.moveToDev = function(name) {
  return changeTeam(name,'V5');
};

module.exports = utils;
