app.service('mapManager', function($rootScope, $filter, geoapiManager, mapCenterManager, mapRouteManager, mapMarkerManager, highlightMarkerUri, normalMarkerUri, pinMarkerUri, mapOptions){
  var radius = 5;
  var mapRadius;
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

  this.getCenter      = function(){ return mapCenterManager.getHomePosition(); };

  this.set            = function(anAddress){
    return geoapiManager.getLatLng(anAddress)
    .then(function(item){
      var loc = item.data.results[0].geometry.location;
      var pos = {latitude:loc.lat, longitude:loc.lng};
      mapCenterManager.init(pos, this.scope, this.getMap());
      this._redrawRadius();
    }.bind(this));
  };

  this._redrawRadius   = function(){
    if(mapRadius) { 
      mapRadius.setMap(null);
    }
    mapRadius = new google.maps.Circle({
      'strokeColor'   : '#b2182b',
      'strokeOpacity' : 0.7,
      'strokeWeight'  : 4,
      'fillColor'     : '#b2182b',
      'fillOpacity'   : 0.0,
      'map'           : this.getMap(),
      'center'        : mapCenterManager.getHomePosition(),
      'radius'        : this.getRadius() * 1.624 * 1000  
    });
  };

  this.getRadius      = function(){ return radius; };

  this.setRadius      = function(value){
    radius = value;
    this._redrawRadius();
  };

  this.update           = function(foodEvents){
    mapMarkerManager.flush();
    for (var i = 0; i < foodEvents.length ; i++) {
      if($filter('isVisible')(foodEvents[i], this.scope)){
        mapMarkerManager.mixin(foodEvents[i], this.getMap());
      } 
    }
  };

  
});
