app.service('countManager', function(timeManager){

  var events = {
    'today'   :{1:0, 3:0, 5:0},
    'tomorrow':{1:0, 3:0, 5:0},
    'thisweek':{1:0, 3:0, 5:0}
  };

  init = function(){
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

  this.update = function(items){
    var tonight = timeManager.tonight();
    var tomorrow = timeManager.tomorrow();
    init();
    for(var i = 0 ; i < items.length ; i++){
      var t = new Date(items[i].time);
      if(t <  tonight  &&                  items[i].distance < 1) events["today"][1]++;
      if(t <  tonight  &&                  items[i].distance < 3) events["today"][3]++;
      if(t <  tonight  &&                  items[i].distance < 5) events["today"][5]++;
      if(t >= tonight  && t <  tomorrow && items[i].distance < 1) events["tomorrow"][1]++;
      if(t >= tonight  && t <  tomorrow && items[i].distance < 3) events["tomorrow"][3]++;
      if(t >= tonight  && t <  tomorrow && items[i].distance < 5) events["tomorrow"][5]++;
      if(                 t >= tomorrow && items[i].distance < 1) events["thisweek"][1]++;
      if(                 t >= tomorrow && items[i].distance < 3) events["thisweek"][3]++;
      if(                 t >= tomorrow && items[i].distance < 5) events["thisweek"][5]++;
    }
  };
});
