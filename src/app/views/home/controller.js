angular.module('app.home', [
  'app.home.logo',
  'app.home.inputMenu',
  'app.home.eventList',
  'ngMap',
  'angularMoment',
  'angularSpinner',
  'shared.mapConstants',
])

.controller('homeController', function($scope, $timeout, $filter, $location, $window, MapManager, MapCenterManager, MapRouteManager, SpinnerManager, CountManager, TimeManager, FeedmeManager){

  $scope.address    = 'San Francisco';
  $scope.predicate  = 'time';
  $scope.reverse    = false;
  $scope.timeframe  = 'today';
  $scope.isVisible  = function(event){return $filter('isVisible')(event, $scope)};
  $scope.radius     = 5;
  $scope.tableHeight= .7*$window.innerHeight;
  $scope.hasEvents  = false;
  $scope.showRoute  = function(event){
    MapRouteManager.get(MapCenterManager.get(), event.marker.getPosition());
  };

  // DELAY ON SEARCH BOX 
  var tempAddress   = '';
  $scope.filterAddressTimeout;
  $scope.getCount   = CountManager.get;

  $scope.update               = function(){
    SpinnerManager.start();
    // FeedmeManager.get($scope.filterAddress).then(function(res){ 
    FeedmeManager.get($scope.filterAddressTimeout).then(function(res){ 
      $scope.events           = res.data.results; 
      for(var i = 0 ; i < $scope.events.length ; i++){
        $scope.events[i].showDescription= false ;
        $scope.events[i].showTags       = false ;
        $scope.events[i].marker         = null  ;
        $scope.events[i].timeFMT        = TimeManager.format($scope.events[i]);
        if($scope.events[i].description.length > 283){
          $scope.events[i].text = $scope.events[i].description.slice(0,283)+' ...';
        } else {
          $scope.events[i].text = $scope.events[i].description;
        }
      }
      CountManager.update($scope.events);   
      return MapManager.update($scope.events);
    }).then(function(){
      SpinnerManager.stop();
    });
  };

  SpinnerManager.start();
  MapManager.init($scope).then(function(position){
    $scope.update();
    $scope.$watch('radius', function(val){
      MapCenterManager.setRadius(val);
      MapManager.setRadius();
      $scope.update();
    });
    $scope.$watch('timeframe', function(val){
      $scope.update();
    });
    $scope.$watch('address', function(val){
      if($scope.filterAddressTimeout) $timeout.cancel($scope.filterAddressTimeout);
      tempAddress = val;
      filterAddressTimeout      = $timeout(function() {
        $scope.filterAddressTimeout = tempAddress;
        MapManager.set($scope.filterAddressTimeout).then(function(){
          $scope.update();
        });
      }, 800);
    });
  });
});

