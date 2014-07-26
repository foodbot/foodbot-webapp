angular.module('app.home.filters')

.filter('eventTime', function(timeManager){
  return function(foodEvents, timeframe) {
    var results = [];
    for (var i = 0; i<foodEvents.length; i++){
      var eventTime = new Date(foodEvents[i].time);
      if(timeframe === "today"){
        if(eventTime < timeManager.tonight()){
          results.push(foodEvents[i]);
        }
      } else if(timeframe === "tomorrow"){
        if(eventTime >= timeManager.tonight() && eventTime < timeManager.tomorrow()){
          results.push(foodEvents[i]);
        }
      } else if(timeframe === "thisweek"){
        if(eventTime >= timeManager.tomorrow()){
          results.push(foodEvents[i]);
        }
      } 
    }
    return results;
  };
});
