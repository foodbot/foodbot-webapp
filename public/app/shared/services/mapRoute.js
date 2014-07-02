app.service('MapRouteService', [
    '$rootScope',
    'MapCenterService',
    function($rootScope, MapCenterService){

  var dest = null;

  this.rendererOptions   = { 
    'draggable': true, 
    'preserveViewport': true
  };

  this.directionsDisplay = new google.maps.DirectionsRenderer(this.rendererOptions);

  this.directionsService = new google.maps.DirectionsService();

  this.getDestination = function(){ return dest; };
  
  this.setDestination = function(position){ dest = position }; 

  this.init = function(map){
    this.directionsDisplay.setMap(map); 
    google.maps.event.addListener(this.directionsDisplay, 'directions_changed', 
      function(MapCenterService, MapRouteService){
        return function() { MapCenterService.set(MapRouteService.getDestination()); };
      }(MapCenterService, this)
    );

  };

  this.get = function(orig, dest){
    this.setDestination(dest);
    request = {
      'origin'      : orig,
      'destination' : this.getDestination(),
      'travelMode'  : google.maps.TravelMode.WALKING 
    };
    this.directionsService.route(request, function(MapRouteService){
      return function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          MapRouteService.directionsDisplay.setDirections(response);
        }
      }
    }(this));
    $rootScope.$on('dragend:home', function(MapRouteService){
      return function(event){ 
        debugger;
        MapRouteService.directionsDisplay.setMap(null);
      }
    }(this));

  }
}]);
