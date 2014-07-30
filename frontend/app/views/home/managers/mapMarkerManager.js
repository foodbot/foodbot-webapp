angular.module('app.home.managers')

//basically has all the functions related to adding pins to the map
.service('mapMarkerManager', function(mapRouteManager, appConstants, google){

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
  
  this.addEventPin = function(foodEvent, startAddress, map, mapManager){ 
    var venue       = foodEvent.venue.address;
    var position    = new google.maps.LatLng(venue.latitude, venue.longitude);
    var marker      = new google.maps.Marker({ 
      title: foodEvent.title,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: appConstants.blankMarkerUri,
      map: map,
    });
    //this fixes flicker bug on chrome
    setTimeout(function(){
      marker.setIcon(appConstants.normalMarkerUri);
    }, 100);

    var description = foodEvent.description;
    if(description.length>143){
      foodEvent.description = foodEvent.description.slice(0,143)+'...';
    }
    var html = '<div><b><a target="_blank" href="'+foodEvent.url+'">'+foodEvent.name+'</a></b></div'+
               '<br>'+
               '<div><a target="_blank" href="https://maps.google.com?saddr='+startAddress+'&daddr='+venue.address1+'"><b>'+foodEvent.venue.name+'</b> <br/>'+venue.address1+'</a></div>';
    
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
        mapRouteManager.showRoute(mapManager.getHomePosition(), foodEvent.marker.getPosition());
        mapCenterManager.setCenterPosition(foodEvent.marker.getPosition());
    }.bind(this));
    var pinHighlightImage = new google.maps.MarkerImage(
      appConstants.highlightMarkerUri,
      new google.maps.Size(46, 53),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34)
    );
    foodEvent.highlightMarker = function(){ 
      this.marker.setIcon(appConstants.highlightMarkerUri); 
      this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    };
    
    foodEvent.normalizeMarker = function(){ 
      this.marker.setIcon(appConstants.normalMarkerUri);
    };
    return foodEvent;
  };
});
