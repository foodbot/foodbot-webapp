angular.module('app.home.searchBar', [])
.directive("searchBar", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchBar/template.html',
    scope:{
      address: "=",
      timeframe: "=",
      radius: "=",
      events: "="
    },
    controller: function($scope, $timeout, countManager, feedmeManager, mapManager, mapCenterManager, timeManager){
      var filterAddressTimeout;
      $scope.events = [];
      $scope.getCount = countManager.get;

      var updateAddress = function(address){
        feedmeManager.get(address).then(function(res){ 
          $scope.events = res.data.results; 
          for(var i = 0 ; i < $scope.events.length ; i++){
            $scope.events[i].showDescription = false ;
            $scope.events[i].showTags        = false ;
            $scope.events[i].marker          = null ;
            $scope.events[i].timeFMT         = timeManager.format($scope.events[i]);
            if($scope.events[i].description.length > 283){
              $scope.events[i].text = $scope.events[i].description.slice(0,283)+' ...';
            } else {
              $scope.events[i].text = $scope.events[i].description;
            }
          }
          countManager.update($scope.events);   
          mapManager.update($scope.events);
        });
      };
      mapManager.init($scope).then(function(position){
        updateAddress();
        $scope.$watch('radius', function(val){
          mapCenterManager.setRadius(val);
          mapManager.setRadius();
          mapManager.update($scope.events);
        });
        $scope.$watch('timeframe', function(val){
          mapManager.update($scope.events);
        });
        $scope.$watch('address', function(val){
          if(filterAddressTimeout) $timeout.cancel(filterAddressTimeout);
          filterAddressTimeout = $timeout(function() {
            mapManager.set($scope.address);
            updateAddress($scope.address);
          }, 800);
        });
      });
    }
  };
});

