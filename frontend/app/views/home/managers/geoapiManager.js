app.service('geoapiManager', function($http, $q, $window, $rootScope){
  var uri = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&' ;

  //gets the latLng position for address 
  //returns a promise
  this.getPosition  = function(addr){ 
    return $http.get(uri+'address='+ addr)
    .then(function(item){
      var loc = item.data.results[0].geometry.location;
      var position = new google.maps.LatLng(loc.lat, loc.lng);
      return position;
    });
  };

  this.getAddress = function(lat, lng){ 
    return $http.get(uri+'latlng='+lat+','+lng); 
  };

});
