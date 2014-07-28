angular.module('app.home.searchResults', [
  'app.home.managers',
  'app.home.filters',
  'shim.jquery'
  ])

.directive("searchResults", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchResults/template.html',
    scope:{
      timeframe: "=",
      radius: "=",
      foodEvents: '=',
    },
    controller: function($scope, $window, mapManager, mapRouteManager){
      $scope.orderCriteria = 'time';
      $scope.showRoute = function(foodEvent){
        mapRouteManager.showRoute(mapManager.getHomePosition(), foodEvent.marker.getPosition());
      };
    }
  };
})
.directive("maxHeightOffsetted", function($window, $){
   return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      var offset = attrs.maxHeightOffsetted;

      elem.css('max-height', $window.innerHeight - offset + 'px');
      $(window).resize(function(){
        elem.css('max-height', $window.innerHeight - offset + 'px');
      });
    }
  };
})
