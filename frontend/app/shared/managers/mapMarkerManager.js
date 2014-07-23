app.service('mapMarkerManager', function(mapRouteManager, mapCenterManager, highlightMarkerUri){

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
  
  this.mixin = function(foodEvent, map){ 
    var venue       = foodEvent.venue.address;
    var marker      = new google.maps.Marker({ 'title': foodEvent.title });
    var position    = new google.maps.LatLng(venue.latitude, venue.longitude);
    marker.setPosition(position);
    marker.setMap(map);
    var text        = '<b><a href="'+foodEvent.unique+'">'+foodEvent.name+'</a></b><br><p><a href="'+foodEvent.unique+'">'; 
    text            += foodEvent.description.length>143?foodEvent.description.slice(0,143)+' ...':foodEvent.description ;
    text            += '</a><address><strong>@ '+foodEvent.venue.name+'</strong> ';
    text            += '<a href="'+foodEvent.unique+'">'+venue.address1+'</a>';
    text            += ' - ' + venue.city;
    marker.infoText   = text;
    marker.infoWindow = new google.maps.InfoWindow({ 
      'content': text, 
      'maxWidth':300,
      'position':position
    });
    storage.push(marker);
    foodEvent.marker          = marker;
    // http://stackoverflow.com/questions/7044587/adding-multiple-markers-with-infowindows-google-maps-api
    google.maps.event.addListener(marker, 'click', function(
          foodEvent, 
          mapMarkerManager, 
          mapCenterManager, 
          mapRouteManager) {
      return function() {
        mapMarkerManager.closeWindow();
        mapMarkerManager.onClick(foodEvent.marker);
        mapRouteManager.get(mapCenterManager.get(), foodEvent.marker.getPosition());
        mapCenterManager.set(foodEvent.marker.getPosition());
      };
    }(foodEvent, 
      this, 
      mapCenterManager, 
      mapRouteManager));
    foodEvent.highlightMarker = function(){ this.marker.setIcon(highlightMarkerUri); };
    foodEvent.normalizeMarker = function(){ this.marker.setIcon(null); };
    return foodEvent;
  };
});
