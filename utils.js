var utils = {};

var Slack = require('node-slack');
var slack = new Slack(process.env.heroku_hook);
var slack_token = process.env.slack_token;
var async = require('async');

var dbname = 'dev_data';
var cradle = require('cradle');
var db_url = process.env.dburl || 'http://localhost'
var db_port = process.env.dbport || 5985
var dbb = new (cradle.Connection)(db_url, db_port).database(dbname);

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
    console.log('Valid token');
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

var getDocs = function(calls) {
     ['cloud','devs'].forEach(function(name){
        calls.push(function(callback) {
            dbb.get(name, function(err, doc) { // remember error first ;)
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });        
        })
    });
}

var saveDocs = function(calls, docs) {
     docs.forEach(function(name){
        calls.push(function(callback) {
            dbb.save(name, function(err, doc) { // remember error first ;)
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });        
        })
    });
}

utils.moveToCloud = function(name) {
    
    var clouddoc,devsdoc = {};
    var calls = [];
    getDocs(calls);
    
    async.parallel(calls, function(err, result) {
        if (err)
            return console.log(err);
            
        clouddoc = result[0];
        devsdoc = result[1]; 
        
        var newdevs = devsdoc.names.filter(n=> n.name === name).splice(0)[0];
        devsdoc.names = devsdoc.names.filter(n=> n.name !== name).splice(0);;
        
        clouddoc.names.push(newdevs);
        
        console.log(clouddoc);
        
        var saves = [];
        var docs = [];
        docs.push(devsdoc);
        docs.push(clouddoc);
        saveDocs(saves,docs); 
        
        async.parallel(saves, function(err, result) {
           if (err)
                return console.log(err);
           console.log('All Saved');
        });
    
    });
    

};

utils.moveToDev = function(name) {
  var clouddoc,devsdoc = {};
    var calls = [];
    getDocs(calls);
    
    async.parallel(calls, function(err, result) {
        if (err)
            return console.log(err);
            
        clouddoc = result[0];
        devsdoc = result[1]; 
        
        var newdevs = clouddoc.names.filter(n=> n.name === name).splice(0)[0];
        clouddoc.names = clouddoc.names.filter(n=> n.name !== name).splice(0);
        
        devsdoc.names.push(newdevs);
        
        console.log(clouddoc);
        
        var saves = [];
        var docs = [];
        docs.push(devsdoc);
        docs.push(clouddoc);
        saveDocs(saves,docs); 
        
        async.parallel(saves, function(err, result) {
           if (err)
                return console.log(err);
           console.log('All Saved');
        });
    
    });
};

module.exports = utils;