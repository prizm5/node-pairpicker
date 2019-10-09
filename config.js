var config = {};

var cradle = require('cradle');

config.dbname = 'dev_data';
config.cradle = require('cradle');
config.db_url = process.env.dburl || 'http://localhost';
config.db_port = process.env.dbport || 5984;
config.isProd = process.env.isProd || true;
config.token = process.env.token || 'test';
config.process_port  = function(app)  { return process.env.port || app.get('port') || 3000;};

config.db = function() {
  return  new (cradle.Connection)(config.db_url, config.db_port).database(config.dbname);
};

module.exports = config;
