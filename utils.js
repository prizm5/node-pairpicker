var utils = {};

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

var changeTeam = function(name,team){
  var dbb = new config.db();
  dbb.view('stats/teams', {}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      let member = data.filter(v => v.value.name === name);
      if(member.length > 0) {
        console.log("found member", member)
        dbb.get(member[0].id, function(err, doc) { 
          if (err) {
            return console.log(err);
          }
          console.log("found member doc", doc)
          doc.team = team;
          dbb.save(doc, function(err, doc) {
              if (err) {
                return console.log(err);
              }
          });
        });
      }
    }
  });
};

utils.moveToCloud = function(name) {
  return changeTeam(name,'Cloud');
};

utils.moveToDev = function(name) {
  return changeTeam(name,'V5');
};

module.exports = utils;
