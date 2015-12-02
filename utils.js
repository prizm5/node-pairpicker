var utils = {};

var Slack = require('node-slack');
var slack = new Slack(process.env.heroku_hook);
var slack_token = process.env.slack_token;

var mapnames = function (pairs) {
  return pairs.map(function (pair) {
    return pair.join(",")
  }).join(" | ")
};

var mapodd = function (pairs) {
  return pairs.join(" | ")
};

utils.sendSlackText = function (parings) {
  var names = mapnames(parings.pairs);
  var odders = mapodd(parings.odders);
  
  var msg = {"text": "Pair Assignement",
   "attachments": [
      {
         "fallback":"Pair Assignement",
         "color":"#D00000",
         "fields":[
            {
               "title":"Pairs",
               "value":names,
               "short":false
            },
            {
               "title":"Odd",
               "value":odders,
               "short":false
            }
         ]
      }
    ]
  };	
  console.log(msg);
  slack.send(msg);
};

utils.checktoken = function(token, res, action) {
  if (token === undefined || token !== slack_token) {
    console.log('Invalid token');
    res.status(401).end('Invalid token');
  }
  else {
    action();
  }
};

module.exports = utils;