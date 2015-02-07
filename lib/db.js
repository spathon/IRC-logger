var config = require('../config'),
    mysql  = require('mysql'),
    db     = mysql.createPool({
      connectionLimit : 50,
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database
    });


module.exports = db;
