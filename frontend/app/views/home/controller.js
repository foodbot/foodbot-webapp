
angular.module('app.home', [
  'app.home.logo',
  'app.home.searchBar',
  'app.home.searchResults',
  'ngMap',
  'angularMoment',
  'angularSpinner',
  'shared.mapConstants',
])

.controller('homeController', function($scope, $timeout, $filter, $location, $window, mapManager, mapRouteManager, countManager, timeManager, apiManager){

  $scope.address     = 'San Francisco';
  $scope.predicate   = 'time';
  $scope.reverse     = false;
  $scope.timeframe   = 'today';
  $scope.radius      = 5;
  $scope.isVisible   = function(event){return $filter('isVisible')(event, $scope);};
  $scope.tableHeight = 0.7*$window.innerHeight;
  $scope.hasEvents   = false;
  $scope.showRoute   = function(event){
    mapRouteManager.get(mapManager.getHomePosition(), event.marker.getPosition());
  };
});

