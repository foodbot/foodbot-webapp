app.filter('time', function(timeManager){
  return function(foodEvent, scope) {
    var aTime = new Date(foodEvent.time);
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
