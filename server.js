
/**
 * Module dependencies
 */
var express = require('express');
var api = require('./routes/api');
var test = require('./routes/test');
var path = require('path');
var app = module.exports = express();

/**
 * Configuration
 */

app.set('port', process.env.PORT || 8000);
app.get('/*', function(req, res, next) {
    if (req.headers.host.match(/^(www|localhost|127.0.0.1)/) === null) {
      res.redirect('http://www.' + req.headers.host + req.url, 301);
    } else {
      next();
    }
});
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Routes
 */
 //redirects to www domain
app.get('/api', api);
app.get('/test', test);

/**
 * Start Server
 */
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});