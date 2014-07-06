app.service('FeedmeManager', function($http){
  return {
    get: function(addr){
      var time = new Date();
      time.setHours(0,0,0,1);
      return $http.get('http://localhost:8000/api?address='+addr+'&time='+time.getTime());
      // return $http.get('http://feedmeapi.cloudapp.net/api?address='+addr+'&time='+time.getTime());
    }
  };
});
