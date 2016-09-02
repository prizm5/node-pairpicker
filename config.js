var config = {};

var cradle = require('cradle');

config.dbname = 'dev_data';
config.cradle = require('cradle');
config.db_url = process.env.dburl || 'http://localhost';
config.db_port = process.env.dbport || 5984;
config.isProd = process.env.isProd || true;

config.pusherId = process.env.pusherId;
config.pusherKey = process.env.pusherKey;
config.pusherSec = process.env.pusherSec;

config.db = function() {
  return  new (cradle.Connection)(config.db_url, config.db_port).database(config.dbname);
}

module.exports = config;
