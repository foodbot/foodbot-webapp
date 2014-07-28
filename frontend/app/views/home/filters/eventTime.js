angular.module('app.home.filters')

.filter('eventTime', function(timeManager){
  return function(foodEvents, timeframe) {
    var results = [];
    var tonight = timeManager.tonight();
    var tomorrow = timeManager.tomorrow();
    var thisweek = timeManager.thisweek();

    for (var i = 0; i<foodEvents.length; i++){
      var eventTime = new Date(foodEvents[i].time);
      if(timeframe === "today"){
        if(eventTime < tonight){
          results.push(foodEvents[i]);
        }
      } else if(timeframe === "tomorrow"){
        if(eventTime >= tonight && eventTime < tomorrow){
          results.push(foodEvents[i]);
        }
      } else if(timeframe === "thisweek"){
        if(eventTime >= tomorrow && eventTime < thisweek){
          results.push(foodEvents[i]);
        }
      } 
    }
    return results;
  };
});
