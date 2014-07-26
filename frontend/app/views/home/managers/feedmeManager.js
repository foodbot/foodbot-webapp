angular.module('app.home.managers')

.service('apiManager', function($http){
  this.get = function(address){
    var time = new Date();
    time.setHours(0,0,0,1);
    return $http.get('/api?address='+address+'&time='+time.getTime());
    // return $http.get('http://feedmeapi.cloudapp.net/api?address='+address+'&time='+time.getTime());
  };
});
