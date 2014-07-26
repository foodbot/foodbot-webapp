angular.module('app.home.managers')

//basically has all the functions related to adding pins to the map
.service('mapMarkerManager', function(mapRouteManager, appConstants){

  var storage = [];

  this.flush = function(){ 
    while(storage.length > 0) {
      storage.pop().setMap(null); 
    }
  };
  
  this.length = function(){ 
    return storage.length;        
  };

  this.closeWindow = function(){ 
    if(this.lastInfo){
      this.lastInfo.close();
    }
  };
  
  this.onClick = function(marker){
    this.lastInfo = marker.infoWindow;
    this.lastInfo.open(marker.getMap(), marker);
  };
  
  this.addEventPin = function(foodEvent, map){ 
    var venue       = foodEvent.venue.address;
    var marker      = new google.maps.Marker({ 'title': foodEvent.title });
    var position    = new google.maps.LatLng(venue.latitude, venue.longitude);
    marker.setPosition(position);
    marker.setMap(map);
    var description = foodEvent.description;
    if(description.length>143){
      foodEvent.description = foodEvent.description.slice(0,143)+'...';
    }
    var html = '<b><a href="'+foodEvent.unique+'">'+foodEvent.name+'</a></b>'+
               '<br>'+
               '<a href="'+foodEvent.unique+'">'+foodEvent.description+'</a>'+
               '<b>@ '+foodEvent.venue.name+'</b>'+
               '<a href="'+foodEvent.unique+'">'+venue.address1+'</a>'+' - ' + venue.city;
    marker.infoWindow = new google.maps.InfoWindow({ 
      'content': html, 
      'maxWidth':300,
      'position':position
    });
    storage.push(marker);
    foodEvent.marker = marker;
    // http://stackoverflow.com/questions/7044587/adding-multiple-markers-with-infowindows-google-maps-api
    google.maps.event.addListener(marker, 'click', function() {
        this.closeWindow();
        this.onClick(foodEvent.marker);
        mapRouteManager.get(mapManager.getHomePosition(), foodEvent.marker.getPosition());
        // mapCenterManager.setCenterPosition(foodEvent.marker.getPosition());
    }.bind(this));
    foodEvent.highlightMarker = function(){ this.marker.setIcon(appConstants.highlightMarkerUri); };
    foodEvent.normalizeMarker = function(){ this.marker.setIcon(null); };
    return foodEvent;
  };
});
