
/**
 * Module dependencies
 */
var express = require('express');
var routes = require('./routes/index');

var app = module.exports = express();

/**
 * Configuration
 */

app.set('port', process.env.PORT || 3050);

/**
 * Routes
 */
app.get('/api', routes.events);

/**
 * Start Server
 */
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});