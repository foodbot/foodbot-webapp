//all positions === new google.maps.LatLng(lat, lng); 

angular.module('app.home.managers')

.service('mapManager', function($rootScope, geocodeManager, mapRouteManager, mapMarkerManager, google, appConstants){
  var radius;
  var centerPosition;
  var radiusCircle;
  var home;

  this.init           = function(){
    this.map          = new google.maps.Map(document.getElementById("map"), appConstants.mapOptions.default); //map defined globally

    mapRouteManager.init(this.map);

    $rootScope.$on('dragend:home', function(e){ 
      this.redrawRadiusCircle();
    }.bind(this));

    google.maps.event.addDomListener(window, 'resize', function(e) {
      this.redrawCenter(); 
    }.bind(this));

    google.maps.event.addListener(this.map, 'zoom_changed', function(e){
      this.redrawCenter(); 
      console.log("redrawCenter");
    }.bind(this));

    var position = appConstants.initialPosition; //Default location == sf
    this.setHomePosition(position);
  };

  this.updateMarkers     = function(foodEvents){
    mapMarkerManager.flush();
    for (var i = 0; i < foodEvents.length ; i++) {
      mapMarkerManager.addEventPin(foodEvents[i], this.getMap());
    }
  };
  this.getMap           = function(){ return this.map; };

  this.setAddress       = function(address){
    return geocodeManager.getPosition(address)
    .then(function(position){
      this.setHomePosition(position);
      this.redrawRadiusCircle();
    }.bind(this));
  };

  this.getHomePosition   = function(){ return home.getPosition(); };

  //sets the home pin/position
  this.setHomePosition   = function(position){
    if(home){ 
      home.setMap(null); 
    }
    home = new google.maps.Marker({ 
      'title': 'My position', 
      'map': this.getMap(),
      'draggable':true, 
      'position': position, 
      'icon': appConstants.homeMarkerUri
    });
    if(!home.getPosition) debugger;
    this.setCenterPosition(home.getPosition());

    // google.maps.event.addListener(home, "dragend", function(e) { 
    //   var position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
    //   this.scope.address = position.lat()+','+position.lng();
    //   this.set(position);
    //   // this.scope.update();
    //   $rootScope.$emit('dragend:home');
    // }.bind(this));
  };

  this.setCenterPosition = function(position){
    if(!this.map.getBounds()) return;
    centerPosition = position;
    this.redrawCenter();
  };
  //recenters map and offsets it
  this.redrawCenter      = function(){
    var ne            = this.map.getBounds().getNorthEast();
    var sw            = this.map.getBounds().getSouthWest();
    var delta         = Math.abs(ne.lng()-sw.lng());
    var lat           = 0.5 * (centerPosition.lat()+this.getHomePosition().lat());
    var lng           = 0.5 * (centerPosition.lng()+this.getHomePosition().lng());
    var offset = new google.maps.LatLng(lat, lng + delta*0.25*(-1));
    this.map.setCenter(offset); 
  };

  this.redrawRadiusCircle = function(){
    if(radiusCircle) { 
      radiusCircle.setMap(null);
    }
    radiusCircle = new google.maps.Circle({
      'strokeColor'   : '#b2182b',
      'strokeOpacity' : 0.7,
      'strokeWeight'  : 4,
      'fillColor'     : '#b2182b',
      'fillOpacity'   : 0.0,
      'map'           : this.getMap(),
      'center'        : this.getHomePosition(),
      'radius'        : this.getRadius() * 1.624 * 1000  
    });
  };

  this.getRadius         = function(){ return radius; };

  this.setRadius         = function(value){
    radius = value;
    this.redrawRadiusCircle();
  };

  

  
});
