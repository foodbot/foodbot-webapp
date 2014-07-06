app.service('MapManager', function($rootScope, $filter, GeoapiManager, MapCenterManager, MapRouteManager, MapMarkerManager, highlightMarkerUri, normalMarkerUri, pinMarkerUri, mapOptions){
  var radius, center ; 
  this.element        = document.getElementById('map');

  this.get            = function(){ return this.mapWrapper; };

  this.getCenter      = function(){ return MapCenterManager.get();};

  this.set            = function(anAddress){
    return GeoapiManager.getLatLng(anAddress).then(function(MapManager){
      return function(addr){
        var loc = addr.data.results[0].geometry.location;
        var pos = {latitude:loc.lat, longitude:loc.lng};
        MapCenterManager.init(pos, MapManager.scope, MapManager.get());
        MapManager.setRadius();
      }
    }(this));
  };

  this.getRadius      = function(){ return radius };

  this.setRadius      = function(){
    radius && radius.setMap(null);
    radius = new google.maps.Circle({
      'strokeColor'   : '#b2182b',
      'strokeOpacity' : 0.7,
      'strokeWeight'  : 4,
      'fillColor'     : '#b2182b',
      'fillOpacity'   : 0.0,
      'map'           : this.mapWrapper,
      'center'        : MapCenterManager.get(),
      'radius'        : MapCenterManager.getRadius() * 1.624 * 1000  
    });

  };

  this.update           = function(events){
    MapMarkerManager.flush();
    for (var i = 0; i < events.length ; i++) {
      if($filter('isVisible')(events[i], this.scope)){
        MapMarkerManager.mixin(events[i], this.get());
      } 
    }
  };

  this.init           = function(scope){
    this.scope        = scope;
    this.mapWrapper = scope.mapWrapper = new google.maps.Map(map, mapOptions.default);
    this.address      = scope.address;
    $rootScope.$on('dragend:home', function(MapManager){
      return function(event){ MapManager.setRadius()}
    }(this));
    return GeoapiManager.init().then(function(position){
      var point = new google.maps.LatLng(position.latitude, position.longitude);
      MapCenterManager.init(position, scope, scope.mapWrapper);
      MapRouteManager.init(scope.mapWrapper);
      // ON WINDOW RESIZE, AUTO RE-CENTER THE MAP
      google.maps.event.addDomListener(window, 'resize', function(event) {
        MapCenterManager.set(MapCenterManager.get()); 
      });
      // CHANGE ADDRESS FOR THE FORMATTED ONE GIVEN LAT-LON OF BROWSER 
      GeoapiManager.getAddress(position).then(function(res){
        scope.address = res.data.results[0].formatted_address;
      });
    })
  };
});
