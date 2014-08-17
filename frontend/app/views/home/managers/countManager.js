angular.module('app.home.managers')

.service('countManager', function(timeManager){

  var eventCount = {
    'today'   :{1:0, 3:0, 5:0},
    'tomorrow':{1:0, 3:0, 5:0},
    'thisWeek':{1:0, 3:0, 5:0}
  };

  var resetCount = function(){
    for(var timeframe in eventCount) {
      for(var radius in eventCount[timeframe]){
        eventCount[timeframe][radius] = 0;
      }
    }
  };

  this.getCount = function(timeframe, radius){
    radius = radius || 5;
    return eventCount[timeframe][radius];
  };

  this.updateCount = function(foodEvent){
    var thisMorning = timeManager.thisMorning();
    var tonight = timeManager.tonight();
    var tomorrow = timeManager.tomorrow();
    var thisWeek = timeManager.thisWeek();

    resetCount();
    for(var i = 0 ; i < foodEvent.length ; i++){
      var t = new Date(foodEvent[i].time);

      if(t >= thisMorning && t < tonight){
        for(var radius in eventCount["today"]){
          if(foodEvent[i].distance < radius){
            eventCount["today"][radius]++;
          }
        }
      }
      if(t >= tonight && t < tomorrow){
        for(var radius in eventCount["tomorrow"]){
          if(foodEvent[i].distance < radius){
            eventCount["tomorrow"][radius]++;
          }
        }
      }
      if(t >= tomorrow && t < thisWeek){
        for(var radius in eventCount["thisWeek"]){
          if(foodEvent[i].distance < radius){
            eventCount["thisWeek"][radius]++;
          }
        }
      }
    }
  };
});
