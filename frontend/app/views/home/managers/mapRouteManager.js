angular.module('app.home.managers')

.service('mapRouteManager', function($rootScope, google){

  var dest = null;

  this.rendererOptions   = { 
    draggable: true,
    suppressMarkers: true,
    preserveViewport: true
  };

  this.directionsDisplay = new google.maps.DirectionsRenderer(this.rendererOptions);

  this.directionsService = new google.maps.DirectionsService();

  this.getDestination = function(){ return dest; };
  
  this.setDestination = function(position){ dest = position; }; 

  this.init = function(map, mapManager){
    this.mapManager = mapManager;
  };

  this.flush = function(){
    this.directionsDisplay.setMap(null);
  };
  this.showRoute = function(orig, dest){
    if(!this.mapManager){
      console.log("mapRouteManager - mapManager not found");
    }
    this.directionsDisplay.setMap(this.mapManager.getMap());
    this.setDestination(dest);
    request = {
      'origin'      : orig,
      'destination' : this.getDestination(),
      'travelMode'  : google.maps.TravelMode.WALKING 
    };
    this.mapManager.redrawCenter(); //re-centers map
    this.directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      }
    }.bind(this));
    // $rootScope.$on('dragend:home', function(e){ 
    //     debugger;
    //     this.directionsDisplay.setMap(null);
    // }.bind(this));
  };
});
