'use strict';
var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'IRC Logger' });
});

module.exports = router;
