angular.module('app.home.managers')

.service('apiManager', function($http){
  this.getEvents = function(address){
    var time = new Date();
    time.setHours(0,0,0,1);
    return $http.get('/api?address='+address+'&time='+time.getTime());
  };
});
