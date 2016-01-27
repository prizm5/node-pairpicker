var db = {};

//if (!process.env.CLOUDANT_URL) {
//  console.error("Please put the URL of your Cloudant instance in an environment variable 'CLOUDANT_URL'")
//  process.exit(1)
//}

// load the Cloudant library
var dbname = 'dev_data';
var nano = require('nano')('http://localhost:5985');
var dbb = nano.db.use(dbname);

db.insert = function(doc) {
    dbb.insert(doc,
      function (err,http_body,http_headers) {
        if(err) { return console.log(err); }
        else { console.log(http_body); }
    });
};

db.savePairs = function(pairs){
    return db.insert(pairs);
}

db.getDevs = function(doc) {
    dbb.get('devs', { revs_info: true }, function(err, body) {
     if(err) { return console.log(err); }
        else { return body; }
    });
};

db.getCloud = function(doc) {
    dbb.get('cloud', { revs_info: true }, function(err, body) {
     if(err) { return console.log(err); }
        else { return body; }
    });
};

db.getQa = function(doc) {
    dbb.get('qa', { revs_info: true }, function(err, body) {
     if(err) { return console.log(err); }
        else { return body; }
    });
};

module.exports = db;
