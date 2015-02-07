'use strict';

var fs = require('fs'),
    _ = require('lodash'),
    env = process.env.NODE_ENV;


var _config = {
  nick: 'Spathon',
  real_name: 'Patrik Spathon',
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'patrik',
    database: 'irc'
  },
  channels: []
};


if(env && fs.existsSync('./config-'+ env +'.json'))
{
  var env_config = require('./config-'+ env +'.json');
  _config = _.merge(_config, env_config);
}

module.exports = _config;
