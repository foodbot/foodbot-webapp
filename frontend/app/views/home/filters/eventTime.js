angular.module('app.home.filters')

.filter('eventTime', function(timeManager){
  return function(foodEvents, timeframe) {
    var results = [];
    var thisMorning = timeManager.thisMorning();
    var tonight = timeManager.tonight();
    var tomorrow = timeManager.tomorrow();
    var thisWeek = timeManager.thisWeek();

    for (var i = 0; i<foodEvents.length; i++){
      var eventTime = new Date(foodEvents[i].time);
      if(timeframe === "today"){
        if(eventTime >= thisMorning && eventTime < tonight){
          results.push(foodEvents[i]);
        }
      } else if(timeframe === "tomorrow"){
        if(eventTime >= tonight && eventTime < tomorrow){
          results.push(foodEvents[i]);
        }
      } else if(timeframe === "thisWeek"){
        if(eventTime >= tomorrow && eventTime < thisWeek){
          results.push(foodEvents[i]);
        }
      } 
    }
    return results;
  };
});
