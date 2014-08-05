
/**
 * Module dependencies
 */
var express = require('express');
var api = require('./routes/api');
var test = require('./routes/test');
var path = require('path');
var app = module.exports = express();

var wwwRedirect = function (req, res, next) {
  if (req.headers.host.slice(0, 3) !== 'www' && !req.headers.host.match(/^(localhost|127.0.0.1)/)) {
    res.redirect(req.protocol + '://www.' + req.headers.host + req.url);
  }else{
    next();
  }
};
/**
 * Configuration
 */
app.set('port', process.env.PORT || 8000);
app.use(wwwRedirect);
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