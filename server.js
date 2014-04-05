/*** Module dependencies ***/
var express = require('express');
var Promise = require('bluebird');
var foodPhrases = require('./foodPhrases');
var excludedPhrases = require('./excludedPhrases');
var http = require('http');
var path = require('path');
var request = Promise.promisifyAll(require('request'));
var _ = require('underscore');

//Added the access to the database
var pmongo = require('promised-mongo');
var db = pmongo('mongodb://feedmeserver.cloudapp.net:27017/feedme', ['meetup']);

var app = express();

// all environments
app.set('port', process.env.PORT || 3050);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }


//example of a query /testdb?address
app.get('/testdb', function(req, res){
  var address = req.query.address || "94108";
  var time = new Date().getTime();

  var radius = req.query.radius || 5;
  var googleApiKey = process.env.GOOGLEAPIKEY || "123FAKEKEY";
  var meetupApiKey = process.env.MEET2UPAPIKEY || "123FAKEKEY";
  console.log("address:", address, "time:", time);

  request.getAsync({url:"https://maps.googleapis.com/maps/api/geocode/json", qs:{key:googleApiKey, sensor:"false", address:address}})
  .then(function(response){
    console.log(response[0].body);
    
    var body = JSON.parse(response[0].body);

    if(body.status === "OK"){
      var lat = body.results[0].geometry.location.lat;
      var lng = body.results[0].geometry.location.lng;
      return {lat: lat, lng:lng};
    }else {
      console.log("API Error:", body.status);
      res.send(200, {results:{}, status: body.status});
      return null;
    }
  })
  .then(function(data){
    if(!data){
      return;
    }
    console.log("Lat:", data.lat, "Long:", data.lng, "Status: OK");
    
    return db.meetup.find({time:{$gt:time}}).limit(200).toArray().then(function(events) {
      var i = 1;
      var dist = null;
      var evtLat = null;
      var evtLng = null;

      var filteredEvt = _.filter(events, function(event){

        evtLat = event.venue.address.latitude;
        evtLng = event.venue.address.longitude;
        
        if(evtLat !== null && evtLng !== null){
          dist = distance(data.lat, data.lng, evtLat, evtLng);
          if(dist < radius){
            // console.log(i++, 'info: ', evtLat, evtLng, '\n distance:',dist);
            event.distance = dist;
            return event;
          }
        }
      });
      return filteredEvt;
    });
  }).then(function(results){
    console.log(results);

    //filters for foods terms and adds found foods to json
    results = _.filter(results, function(item){
      var hasFood = false;
      var foodProvided = [];

      _.each(foodPhrases.regexpList, function(regexp){
        if(!item.description){
          return;
        }
        var matches = item.description.match(regexp);
        if(matches){
          hasFood = true;
          foodProvided = foodProvided.concat(matches);
        }
      });
      foodProvided = _.map(foodProvided, function(food){
        return food.toLowerCase().trim();
      });
      item.foodProvided = foodProvided;
      return hasFood;
    });
    //filters for excluded terms
    results = _.filter(results, function(item){
      var isValid = true;
      if(!item.description){
        return;
      }
      _.each(excludedPhrases.regexpList, function(regexp){
        var matches = item.description.match(regexp);
        if(matches){
          isValid = false;
        }
      });
      return isValid;
    });
    res.send(results);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function distance(lat1, lon1, lat2, lon2) {
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}
