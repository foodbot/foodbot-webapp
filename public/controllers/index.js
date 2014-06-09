app.controller('HomeController', 
  function(
    $scope, 
    $timeout, 
    $filter,
    $location,
    $window,
    MapService,
    MapCenterService,
    MapRouteService,
    SpinnerService,
    CountService,
    TimeService,
    FeedmeService){
  $scope.address    = 'San Francisco';
  $scope.predicate  = 'time';
  $scope.reverse    = false;
  $scope.timeframe  = 'today';
  $scope.isVisible  = function(event){return $filter('isVisible')(event, $scope)};
  $scope.radius     = 5;
  $scope.tableHeight= .7*$window.innerHeight;
  $scope.hasEvents  = false;
  $scope.showRoute  = function(event){
    MapRouteService.get(MapCenterService.get(), event.marker.getPosition());
  };

  // DELAY ON SEARCH BOX 
  var tempAddress   = '';
  $scope.filterAddressTimeout;
  $scope.getCount   = CountService.get;

  $scope.update               = function(){
    SpinnerService.start();
    // FeedmeService.get($scope.filterAddress).then(function(res){ 
    FeedmeService.get($scope.filterAddressTimeout).then(function(res){ 
      $scope.events           = res.data.results; 
      for(var i = 0 ; i < $scope.events.length ; i++){
        $scope.events[i].showDescription= false ;
        $scope.events[i].showTags       = false ;
        $scope.events[i].marker         = null  ;
        $scope.events[i].timeFMT        = TimeService.format($scope.events[i]);
        if($scope.events[i].description.length > 283){
          $scope.events[i].text = $scope.events[i].description.slice(0,283)+' ...';
        } else {
          $scope.events[i].text = $scope.events[i].description;
        }
      }
      CountService.update($scope.events);   
      return MapService.update($scope.events);
    }).then(function(){
      SpinnerService.stop();
    });
  };

  SpinnerService.start();
  MapService.init($scope).then(function(position){
    $scope.update();
    $scope.$watch('radius', function(val){
      MapCenterService.setRadius(val);
      MapService.setRadius();
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
        MapService.set($scope.filterAddressTimeout).then(function(){
          $scope.update();
        });
      }, 800);
    });
  });
});
