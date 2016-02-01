var utils = {};

var Slack = require('node-slack');
var slack = new Slack(process.env.heroku_hook);
var slack_token = process.env.slack_token;

var fs = require('fs');

var mapnames = function (pairs) {
  return pairs.map(function (pair) {
    return pair.replace(" :: ",",")
  }).join(" | ")
};

var mapodd = function (pairs) {
  if(pairs)
    return pairs.join(" | ");
  else 
    return [];
};

utils.sendSlackText = function (parings) {
  console.log("utils send to slack " + parings);
  var names = mapnames(parings.pairs);
  var odders = mapodd(parings.odd);
  
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

var outputFilename = 'developers.json';

var writeDevs = function(){
    /*fs.writeFile(outputFilename, JSON.stringify(devs, null, 4), function(err) {
        if(err) {
        console.log(err);
        } else {
        console.log("JSON saved to " + outputFilename);
        }
    }); */
};


var remove = function(name, array) {
    var move = {};
    for(var i = array.length - 1; i >= 0; i--) {
        if(array[i].name === name) {
            move = array[i];
            array.splice(i, 1);
            return move;
        }
    }
    console.log('removed ' + move);
};

utils.moveToCloud = function(name) {
    /*var n = name.name;
    console.log('moving to cloud: ' + n);
    var add = remove(n, devs.devs)
    if(add) devs.cloud.push(add);
    writeDevs();*/
};

utils.moveToDev = function(name) {
   /* var n = name.name;
    console.log('moving to dev: ' + n);
    var add = remove(n, devs.cloud)
    if(add) devs.devs.push(add);
    writeDevs();*/
};

module.exports = utils;