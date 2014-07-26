angular.module('app.home.managers')

.service('countManager', function(timeManager){

  var events = {
    'today'   :{1:0, 3:0, 5:0},
    'tomorrow':{1:0, 3:0, 5:0},
    'thisweek':{1:0, 3:0, 5:0}
  };

  var init = function(){
    for(var i in events) {
      for(var j in events[i]){
        events[i][j] = 0;
      }
    }
  };

  this.get = function(timeframe, radius){
    radius = radius || 5;
    return events[timeframe][radius];
  };

  this.update = function(foodEvent){
    var tonight = timeManager.tonight();
    var tomorrow = timeManager.tomorrow();
    init();
    for(var i = 0 ; i < foodEvent.length ; i++){
      var t = new Date(foodEvent[i].time);
      if(t <  tonight  &&                  foodEvent[i].distance < 1) events["today"][1]++;
      if(t <  tonight  &&                  foodEvent[i].distance < 3) events["today"][3]++;
      if(t <  tonight  &&                  foodEvent[i].distance < 5) events["today"][5]++;
      if(t >= tonight  && t <  tomorrow && foodEvent[i].distance < 1) events["tomorrow"][1]++;
      if(t >= tonight  && t <  tomorrow && foodEvent[i].distance < 3) events["tomorrow"][3]++;
      if(t >= tonight  && t <  tomorrow && foodEvent[i].distance < 5) events["tomorrow"][5]++;
      if(                 t >= tomorrow && foodEvent[i].distance < 1) events["thisweek"][1]++;
      if(                 t >= tomorrow && foodEvent[i].distance < 3) events["thisweek"][3]++;
      if(                 t >= tomorrow && foodEvent[i].distance < 5) events["thisweek"][5]++;
    }
  };
});
