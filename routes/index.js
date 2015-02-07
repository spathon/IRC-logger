'use strict';
var express = require('express'),
    router  = express.Router(),
    moment  = require('moment'),
    db      = require('../lib/db');


/* GET home page. */
router.get('/', function(req, res, next) {

  db.query('SELECT * FROM messages LIMIT 200', function(err, messages) {
    if(err) return next(err);

    res.render('index', { messages: messages, moment: moment });
  });
});

module.exports = router;
