angular.module('app.home.managers', []);
angular.module('app.home.filters', ['app.home.managers']);

angular.module('app.home', [
  'app.home.filters',
  'app.home.managers',
  'app.home.searchResults',
  'app.home.searchBar',
  'app.home.logo',
  'ngMap',
  'angularMoment',
  'angularSpinner',
  'shared.mapConstants',
])

.controller('homeController', function($scope, $window, mapManager, mapRouteManager){

  $scope.address     = 'San Francisco';
  $scope.predicate   = 'time';
  $scope.reverse     = false;
  $scope.timeframe   = 'today';
  $scope.radius      = 5;
  $scope.foodEvents  = [];
  $scope.tableHeight = 0.7*$window.innerHeight;
  $scope.hasEvents   = false;
  $scope.showRoute   = function(foodEvent){
    mapRouteManager.get(mapManager.getHomePosition(), foodEvent.marker.getPosition());
  };
});

