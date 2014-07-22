//http://proccli.com/2013/10/angularjs-geolocation-service
app.service('geoapiManager', function($http, $q, $window, $rootScope){
  var initialPosition = {'latitude': 37.7833,'longitude':-122.4167}; // San Francisco
  var uri = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&' ;

  this.init = function(){
    var deferred = $q.defer();
    deferred.resolve(initialPosition);
    return deferred.promise;
  };

  this.getLatLng  = function(addr){ 
    return $http.get(uri+'address='+ addr); 
  };

  this.getAddress = function(lat, lng){ 
    return $http.get(uri+'latlng='+lat+','+lng); 
  };

});
