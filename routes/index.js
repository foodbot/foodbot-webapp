
/**
 * Module dependencies
 */
var Promise = require('bluebird');
var http = require('http');
var request = Promise.promisifyAll(require('request'));
var _ = require('underscore');

/**
 * Other dependencies
 */
var foodPhrases = require('../foodPhrases');
var excludedPhrases = require('../excludedPhrases');

/**
 * Database access
 */
var pmongo = require('promised-mongo');
var db = pmongo(process.env.MONGOURL, ['meetup', 'eventbrite', 'funcheap']);

/**
 * Main Function
 */

exports.events = function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  // Below changed the default address for testing purposes
  var address = req.query.address || 94108;
  var time = new Date().getTime();
  var radius = req.query.radius || 5;
  var googleApiKey = process.env.GOOGLEAPIKEY || "123FAKEKEY";
  console.log("address:", address, "time:", time);

  // qs : object containing querystring values to be appended to the uri 
  

  /**
   * Converting the Address to latitude and longitude data
   */
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

  /**
   * Getting the next events from the different collections
   */
  .then(function(data){
    return Promise.all([
      db.meetup.find({time:{$gt:time-5*60*60*1000}}).limit(1000).toArray(),
      db.eventbrite.find({time:{$gt:time-5*60*60*1000}}).limit(1000).toArray(),
      db.funcheap.find({time:{$gt:time-5*60*60*1000}}).limit(1000).toArray(),
      data
    ]);
  })
  
  /**
   * Getting the next events from the different collections
   */
  .spread(function(meetup, eventbrite, funcheap, data) {
    // concat the meetup, eventbrite and funcheap results
    var allEvents = _.union(meetup, eventbrite, funcheap);
    // order them by time
    allEvents = _.sortBy(allEvents, function(o) { return o.time; });

    // var i = 1;
    var dist = null;
    var evtLat = null;
    var evtLng = null;
    return _.filter(allEvents, function(item){
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

  /**
   * Taking out the finished events from the results
   */
  .filter(function(item){
    return item.time + item.duration > time; 
  })

  /**
   * Retrieve events that have Our FoodPhrases in description
   */
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

  /**
   * Exclude events that have excluded Phrases in description
   */
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

  /**
   * Return the filtered events
   */
  .then(function(results){
    console.log("Results returned:", results.length);
    res.send({results:results, status:"OK"});
  })
  .catch(function(err){
    console.log("Error:", err);
    res.send({results:[], status:err+""});
  });
};

/**
 * Extra Functions
 */
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

setInterval(function(){
  db.runCommand({ping:1})
  .then(function(res) {
    if(res.ok){ 
      console.log("We're still up!");
    }
  });
}, 3000);