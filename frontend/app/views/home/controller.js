angular.module('app.home.managers', ["shared.appConstants"]);
angular.module('app.home.filters', ['app.home.managers']);

angular.module('app.home', [
  'app.home.filters',
  'app.home.managers',
  'app.home.searchResults',
  'app.home.searchBar',
  'app.home.logo',
  'ngMap',
  'angularMoment',
])

.controller('homeController', function($scope, $window, mapManager, mapRouteManager){

  $scope.address       = 'San Francisco';
  $scope.orderCriteria = 'time';
  $scope.reverse       = false;
  $scope.timeframe     = 'today';
  $scope.radius        = 5;
  $scope.foodEvents    = [];
  $scope.tableHeight   = 0.7*$window.innerHeight;
  $scope.hasEvents     = false;
  $scope.showRoute     = function(foodEvent){
    mapRouteManager.showRoute(mapManager.getHomePosition(), foodEvent.marker.getPosition());
  };
});

