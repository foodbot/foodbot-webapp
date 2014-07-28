angular.module('app.home', [
  'app.home.searchResults',
  'app.home.searchBar',
  'app.home.logo',
])

.controller('homeController', function($scope, $window){
  //Initial values
  $scope.address       = 'San Francisco';
  $scope.timeframe     = 'today';
  $scope.radius        = 5;
  $scope.foodEvents    = [];
});

