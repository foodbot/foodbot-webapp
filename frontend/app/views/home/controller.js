
angular.module('app.home', [
  'app.home.logo',
  'app.home.searchBar',
  'app.home.searchResults',
  'ngMap',
  'angularMoment',
  'angularSpinner',
  'shared.mapConstants',
])

.controller('homeController', function($scope, $timeout, $filter, $location, $window, mapManager, mapCenterManager, mapRouteManager, countManager, timeManager, feedmeManager){

  $scope.address     = 'San Francisco';
  $scope.predicate   = 'time';
  $scope.reverse     = false;
  $scope.timeframe   = 'today';
  $scope.radius      = 5;
  $scope.isVisible   = function(event){return $filter('isVisible')(event, $scope);};
  $scope.tableHeight = 0.7*$window.innerHeight;
  $scope.hasEvents   = false;
  $scope.showRoute   = function(event){
    mapRouteManager.get(mapCenterManager.get(), event.marker.getPosition());
  };
});

