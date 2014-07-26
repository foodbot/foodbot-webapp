angular.module('app.home.filters')

.filter('eventDistance', function(mapManager){
  var mapDistance = function(foodEvent){
    var pos   = mapManager.getHomePosition();
    var lat1  = (Math.PI / 180) * pos.lat()   ;
    var lat2  = (Math.PI / 180) * foodEvent.venue.address.latitude ;
    var lon1  = (Math.PI / 180) * pos.lng() ; 
    var lon2  = (Math.PI / 180) * foodEvent.venue.address.longitude ;
    var x     = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var y     = (lat2-lat1);
    var R     = 6371;
    var km2miles = 0.621371192;
    return Math.sqrt(x*x + y*y) * R * km2miles ;
  };

  return function(foodEvents, targetDistance){
    var results = [];
    for (var i = 0; i<foodEvents.length; i++){
      var distance = mapDistance(foodEvents[i]);
      if (distance < targetDistance){
        results.push(foodEvents[i]);
      }
    }
    return results;
  };
});
