

var config = require('./config');

var irc = require('irc'),
    client = new irc.Client('irc.freenode.net', config.nick, {
      realName: config.real_name,
      channels: config.channels,
    }),
    mysql = require('mysql'),
    db  = mysql.createPool({
      connectionLimit : 50,
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database
    });


console.log('Lets go');

client.addListener('error', function(message) {
    console.log('Error: ', message);
});


client.addListener('message', function (from, channel, text) {
  // console.log(from + ' => ' + channel + ': ' + text);

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


// client.addListener('pm', function (from, text) {
//   var message = {
//         from: from,
//         message: text
//       };
//   db.query('INSERT INTO private_messages SET ?', message, function(err, result) {
//     if(err) console.log('Mysql Error (PM): ', err);
//   });
// });
