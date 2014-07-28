angular.module('app.home.managers')

.service('mapRouteManager', function($rootScope, google){

  var dest = null;

  this.rendererOptions   = { 
    'draggable': true, 
    'preserveViewport': true
  };

  this.directionsDisplay = new google.maps.DirectionsRenderer(this.rendererOptions);

  this.directionsService = new google.maps.DirectionsService();

  this.getDestination = function(){ return dest; };
  
  this.setDestination = function(position){ dest = position; }; 

  this.init = function(map){
    this.directionsDisplay.setMap(map); 
  };

  this.showRoute = function(orig, dest){
    this.setDestination(dest);
    request = {
      'origin'      : orig,
      'destination' : this.getDestination(),
      'travelMode'  : google.maps.TravelMode.WALKING 
    };
    this.directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      }
    }.bind(this));
    $rootScope.$on('dragend:home', function(e){ 
        debugger;
        this.directionsDisplay.setMap(null);
    }.bind(this));
  };
});