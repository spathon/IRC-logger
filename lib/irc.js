var config  = require('../config'),
    db      = require('./db');
    irc     = require('irc'),
    client  = new irc.Client('irc.freenode.net', config.nick, {
      realName: config.real_name,
      channels: config.channels,
    });

console.log('IRC init');

// Prevent shutdown on error
client.addListener('error', function(message) {
    console.log('Error: ', message);
});

// Listen to all messages
client.addListener('message', function (from, channel, text) {
  // console.log(from + ' => ' + channel + ': ' + text);

  // Save the message to the database
  var reg = new RegExp('/'+ config.nick +'/', 'i'),
      mention = (text.search(reg) != -1),
      message = {
        from: from,
        message: text,
        channel: channel,
        mention: mention,
        pm: (channel === config.nick)
      };
  db.query('INSERT INTO messages SET ?', message, function(err, result) {
    if(err) console.log('Mysql Error: ', err);
  });
});

module.exports = client;
