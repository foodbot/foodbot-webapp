app.filter('time', ['TimeService', function(TimeService){
  return function(event, scope) {
    var aTime = new Date(event.time);
    if(scope.timeframe === "today"){
      return aTime < TimeService.tonight();
    } else if(scope.timeframe === "tomorrow"){
      return aTime >= TimeService.tonight() && aTime < TimeService.tomorrow();
    } else if(scope.timeframe === "later"){
      return aTime >= TimeService.tomorrow() ;
    } 
    return true;
  }
}]);
