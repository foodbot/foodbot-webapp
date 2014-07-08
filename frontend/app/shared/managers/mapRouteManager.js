app.service('mapRouteManager', function($rootScope, mapCenterManager){

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
      function(mapCenterManager, mapRouteManager){
        return function() { mapCenterManager.set(mapRouteManager.getDestination()); };
      }(mapCenterManager, this)
    );

  };

  this.get = function(orig, dest){
    this.setDestination(dest);
    request = {
      'origin'      : orig,
      'destination' : this.getDestination(),
      'travelMode'  : google.maps.TravelMode.WALKING 
    };
    this.directionsService.route(request, function(mapRouteManager){
      return function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          mapRouteManager.directionsDisplay.setDirections(response);
        }
      }
    }(this));
    $rootScope.$on('dragend:home', function(mapRouteManager){
      return function(event){ 
        debugger;
        mapRouteManager.directionsDisplay.setMap(null);
      }
    }(this));

  }
});
