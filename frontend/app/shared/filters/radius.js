app.filter('radius', function(mapCenterManager){
  mapDistance = function(event){
    var pos   = mapCenterManager.get()
    var lat1  = (Math.PI / 180) * pos.lat()   ;
    var lat2  = (Math.PI / 180) * event.venue.address.latitude ;
    var lon1  = (Math.PI / 180) * pos.lng() ; 
    var lon2  = (Math.PI / 180) * event.venue.address.longitude ;
    var x     = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var y     = (lat2-lat1);
    var R     = 6371;
    var km2miles = 0.621371192;
    return Math.sqrt(x*x + y*y) * R * km2miles ;
  };

  return function(event){
    var result = mapDistance(event);
    var radius = mapCenterManager.getRadius();
    return  result < radius ; 
  };
});
