//http://proccli.com/2013/10/angularjs-geolocation-service
app.service('GeoapiService', 
  ['$http',
  '$q',
  '$window',
  '$rootScope',
  function($http, $q, $window, $rootScope){
  var position0 = {'latitude': 37.7,'longitude':-122.4}; // San Francisco
  var position = position0;
  var uri = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&' ;

  this.init = function(){
    var deferred = $q.defer();
    if (!$window.navigator) {
        $rootScope.$apply(function(){ deferred.resolve(position0)})
    } else {
      $window.navigator.geolocation.getCurrentPosition(function(position){
        $rootScope.$apply(function(){ deferred.resolve(position.coords)})
      }, function (error) {
        $rootScope.$apply(function(){ deferred.reject(position0)})
      });
    }
    return deferred.promise;
  };

  this.getLatLng  = function(addr){ 
    return $http.get(uri+'address='+ addr); 
  };

  this.getAddress = function(coord){ 
    return $http.get(uri+'latlng=' +coord.latitude+','+coord.longitude); 
  };

}]);
