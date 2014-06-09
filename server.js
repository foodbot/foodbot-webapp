
/**
 * Module dependencies
 */
var express = require('express');
var routes = require('./routes/index');
var test = require('./routes/test');
var path = require('path');
var app = module.exports = express();

/**
 * Configuration
 */

app.set('port', process.env.PORT || 3050);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Routes
 */
app.get('/api', routes.events);
app.get('/test', test.events);

/**
 * Start Server
 */
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});