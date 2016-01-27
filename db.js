var db = {};

//if (!process.env.CLOUDANT_URL) {
//  console.error("Please put the URL of your Cloudant instance in an environment variable 'CLOUDANT_URL'")
//  process.exit(1)
//}

// load the Cloudant library
var dbname = 'dev_data';

  var cradle = require('cradle');
  var dbb = new(cradle.Connection)('http://phisql12db01',5984).database(dbname);

db.insert = function(doc) {
    dbb.insert(doc,
      function (err,http_body,http_headers) {
        if(err) { return console.log(err); }
        else { console.log(http_body); }
    });
};

db.savePairs = function(pairs){
    return dbb.insert(pairs);
}

db.getDevs2 = function(cb) {
    return dbb.get('devs', cb);
}
db.getDevs = function() {
     dbb.get('devs', function (err, doc) {
        return doc.names; 
    });
};

db.getCloud2 = function(cb) {
    return dbb.get('cloud', cb);
}
db.getCloud = function() {
    dbb.get('cloud', function (err, doc) {
        return doc.names;
    });
};

db.getQa = function() {
    dbb.get('qa', function (err, doc) {
        return doc.names;
    });
};

module.exports = db;
