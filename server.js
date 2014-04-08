/*** Module dependencies ***/
var express = require('express');
var Promise = require('bluebird');
var foodPhrases = require('./foodPhrases');
var excludedPhrases = require('./excludedPhrases');
var http = require('http');
var request = Promise.promisifyAll(require('request'));
var _ = require('underscore');

//Adding access to the database
var pmongo = require('promised-mongo');
var db = pmongo('mongodb://feedmeserver.cloudapp.net:27017/feedme?maxIdleTimeMS=180000', ['meetup']);

var app = express();

// all environments
app.set('port', process.env.PORT || 3050);

//example of a query /testdb?address
app.get('/api', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  var address = req.query.address || "";
  var time = new Date().getTime();
  var radius = req.query.radius || 5;
  var googleApiKey = process.env.GOOGLEAPIKEY || "123FAKEKEY";
  console.log("address:", address, "time:", time);

  request.getAsync({url:"https://maps.googleapis.com/maps/api/geocode/json", qs:{key:googleApiKey, sensor:"false", address:address}})
  .then(function(args){
    var body = JSON.parse(args[1]);
    if(body.status === "OK"){
      var lat = body.results[0].geometry.location.lat;
      var lng = body.results[0].geometry.location.lng;
      console.log("Lat:", lat, "Long:", lng, "Status: OK");
      return {lat: lat, lng:lng};
    }else {
      throw "API Error: "+body.status;
    }
  })
  .then(function(data){
    return Promise.all([
      db.meetup.find({time:{$gt:time-5*60*60*1000}}).limit(1000).toArray(), 
      data
    ]);
  })
  .spread(function(events, data) {
    var i = 1;
    var dist = null;
    var evtLat = null;
    var evtLng = null;
    return _.filter(events, function(item){
      evtLat = item.venue.address.latitude;
      evtLng = item.venue.address.longitude;
      if(evtLat !== null && evtLng !== null){
        dist = distance(data.lat, data.lng, evtLat, evtLng);
        item.distance = dist;
        // console.log(i++, 'info: ', evtLat, evtLng, '\n distance:',dist);
        return dist < radius;
      }
    });
  })
  .filter(function(item){
    //filters for events that already finished
    return item.time + item.duration > time; 
  })
  .filter(function(item){
    //filters for foods terms and adds found food to json
    var foodProvided = [];
    if(!item.description){
      return false;
    }
    _.each(foodPhrases.regexpList, function(regexp){
      var matches = item.description.match(regexp) || [];
      foodProvided = foodProvided.concat(matches);
    });
    item.foodProvided = _.map(foodProvided, function(food){
      return food.toLowerCase().trim();
    });

    return item.foodProvided.length > 0;
  })
  .filter(function(item){
    //filters excluded terms from description
    for(var i = 0; i < excludedPhrases.regexpList.length; i++){
      var regexp = excludedPhrases.regexpList[i];
      var matches = item.description.match(regexp);
      if(matches){
        return false;
      }
    }
    return true;
  })
  .then(function(results){
    console.log("Results returned:", results.length);
    res.send({results:results, status:"OK"});
  })
  .catch(function(err){
    console.log("Error:", err);
    res.send({results:[], status:err+""});
  });
});

app.listen(app.get('port'), function(){
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
