app.service('mapManager', function($rootScope, $filter, geoapiManager, mapCenterManager, mapRouteManager, mapMarkerManager, highlightMarkerUri, normalMarkerUri, pinMarkerUri, mapOptions){
  var radius;
  var center;

  this.element        = document.getElementById('map');

  this.init           = function(scope){
    this.scope        = scope;
    this.mapWrapper   = scope.mapWrapper = new google.maps.Map(map, mapOptions.default); //map defined globally
    this.address      = scope.address;

    mapRouteManager.init(this.mapWrapper);

    $rootScope.$on('dragend:home', function(mapManager){
      return function(event){ mapManager.setRadius();};
    }(this));
    // ON WINDOW RESIZE, AUTO RE-CENTER THE MAP
    google.maps.event.addDomListener(window, 'resize', function(event) {
      mapCenterManager.refresh(); 
    });
    return geoapiManager.init().then(function(position){
      mapCenterManager.init(position, scope, scope.mapWrapper);
      mapCenterManager.setCoord(position.latitude, position.longitude);
    });
  };

  this.getMap         = function(){ return this.mapWrapper; };


  this.getCenter      = function(){ return mapCenterManager.get();};

  this.set            = function(anAddress){
    return geoapiManager.getLatLng(anAddress).then(function(mapManager){
      return function(addr){
        var loc = addr.data.results[0].geometry.location;
        var pos = {latitude:loc.lat, longitude:loc.lng};
        mapCenterManager.init(pos, mapManager.scope, mapManager.getMap());
        mapManager.setRadius();
      };
    }(this));
  };

  this.getRadius      = function(){ return radius; };

  this.setRadius      = function(){
    radius && radius.setMap(null);
    radius = new google.maps.Circle({
      'strokeColor'   : '#b2182b',
      'strokeOpacity' : 0.7,
      'strokeWeight'  : 4,
      'fillColor'     : '#b2182b',
      'fillOpacity'   : 0.0,
      'map'           : this.getMap(),
      'center'        : mapCenterManager.get(),
      'radius'        : mapCenterManager.getRadius() * 1.624 * 1000  
    });

  };

  this.update           = function(events){
    mapMarkerManager.flush();
    for (var i = 0; i < events.length ; i++) {
      if($filter('isVisible')(events[i], this.scope)){
        mapMarkerManager.mixin(events[i], this.getMap());
      } 
    }
  };

  
});
