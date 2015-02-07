var config       = require('./config'),
    express      = require('express'),
    path         = require('path'),
    favicon      = require('static-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),

    irc_client   = require('./lib/irc'),
    app          = express();



/*=============================================*\
  Setup Express
\*=============================================*/

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



/*=============================================*\
  Routes
\*=============================================*/

var routes = require('./routes/index');
app.use('/', routes);



/*=============================================*\
  Start the Express server
\*=============================================*/

app.set('port', process.env.PORT || 1988);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
