app.service('MapMarkerService', 
  ['MapRouteService',
  'MapCenterService',
  'highlightMarkerUri',
  function(MapRouteService, MapCenterService, highlightMarkerUri){

  var storage = [];

  this.flush = function(){ 
    while(storage.length > 0) storage.pop().setMap(null);
  };
  
  this.length = function(){ 
    return storage.length;        
  };

  this.closeWindow = function(){ 
    this.lastInfo && this.lastInfo.close(); 
  };
  
  this.onClick = function(marker){
    this.lastInfo = marker.infoWindow;
    this.lastInfo.open(marker.getMap(), marker);
  };
  
  this.mixin = function(event, map){ 
    var venue       = event.venue.address;
    var marker      = new google.maps.Marker({ 'title': event.title });
    var position    = new google.maps.LatLng(venue.latitude, venue.longitude);
    marker.setPosition(position);
    marker.setMap(map);
    var text        = '<b><a href="'+event.unique+'">'+event.name+'</a></b><br><p><a href="'+event.unique+'">'; 
    text            += event.description.length>143?event.description.slice(0,143)+' ...':event.description ;
    text            += '</a><address><strong>@ '+event.venue.name+'</strong> ';
    text            += '<a href="'+event.unique+'">'+venue.address1+'</a>';
    text            += ' - ' + venue.city;
    marker.infoText   = text;
    marker.infoWindow = new google.maps.InfoWindow({ 
      'content': text, 
      'maxWidth':300,
      'position':position
    });
    storage.push(marker);
    event.marker          = marker;
    // http://stackoverflow.com/questions/7044587/adding-multiple-markers-with-infowindows-google-maps-api
    google.maps.event.addListener(marker, 'click', function(
          event, 
          MapMarkerService, 
          MapCenterService, 
          MapRouteService) {
      return function() {
        MapMarkerService.closeWindow();
        MapMarkerService.onClick(event.marker);
        MapRouteService.get(MapCenterService.get(), event.marker.getPosition());
        MapCenterService.set(event.marker.getPosition());
      }
    }(event, 
      this, 
      MapCenterService, 
      MapRouteService));
    event.highlightMarker = function(){ this.marker.setIcon(highlightMarkerUri); };
    event.normalizeMarker = function(){ this.marker.setIcon(null); };
    return event;
  };
}]);
