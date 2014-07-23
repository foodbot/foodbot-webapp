app.service('mapManager', function($rootScope, $filter, geoapiManager, mapCenterManager, mapRouteManager, mapMarkerManager, highlightMarkerUri, normalMarkerUri, pinMarkerUri, mapOptions){
  var radius;
  var center;
  this.element        = document.getElementById('map');

  this.init           = function(scope){
    this.scope        = scope;
    this.mapWrapper   = scope.mapWrapper = new google.maps.Map(map, mapOptions.default); //map defined globally
    this.address      = scope.address;

    mapRouteManager.init(this.mapWrapper);

    $rootScope.$on('dragend:home', function(e){ 
      this.setRadius();
    }.bind(this));
    // ON WINDOW RESIZE, AUTO RE-CENTER THE MAP
    google.maps.event.addDomListener(window, 'resize', function(e) {
      mapCenterManager.refresh(); 
    });
    return geoapiManager.init()
    .then(function(position){
      mapCenterManager.init(position, scope, scope.mapWrapper);
      mapCenterManager.setCoord(position.latitude, position.longitude);
    });
  };

  this.getMap         = function(){ return this.mapWrapper; };


  this.getCenter      = function(){ return mapCenterManager.get();};

  this.set            = function(anAddress){
    return geoapiManager.getLatLng(anAddress)
    .then(function(item){
      var loc = item.data.results[0].geometry.location;
      var pos = {latitude:loc.lat, longitude:loc.lng};
      mapCenterManager.init(pos, this.scope, this.getMap());
      this.setRadius();
    }.bind(this));
  };

  this.getRadius      = function(){ return radius; };

  this.setRadius      = function(){
    if(radius) { radius.setMap(null); }
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
