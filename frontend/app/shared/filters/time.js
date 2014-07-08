app.filter('time', function(timeManager){
  return function(event, scope) {
    var aTime = new Date(event.time);
    if(scope.timeframe === "today"){
      return aTime < timeManager.tonight();
    } else if(scope.timeframe === "tomorrow"){
      return aTime >= timeManager.tonight() && aTime < timeManager.tomorrow();
    } else if(scope.timeframe === "later"){
      return aTime >= timeManager.tomorrow() ;
    } 
    return true;
  };
});
