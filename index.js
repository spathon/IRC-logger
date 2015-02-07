var config       = require('./config'),
    express      = require('express'),
    path         = require('path'),
    favicon      = require('static-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),

    app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./routes/index');
app.use('/', routes);



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


app.set('port', process.env.PORT || 1988);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
