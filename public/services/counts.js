app.service('CountService', [
  'TimeService',
  function(TimeService){

  var N = {
    'today'   :{'LT1':0,'LT3':0,'LT5':0},
    'tomorrow':{'LT1':0,'LT3':0,'LT5':0},
    'thisweek':{'LT1':0,'LT3':0,'LT5':0}
  };

  init = function(){
    for(var i in N) for(var j in N[i]) N[i][j] = 0;
  };

  this.get =function(time, distance){
    return N[time][distance];
  };

  this.update = function(x){
    var tonight = TimeService.tonight();
    var tomorrow= TimeService.tomorrow();
    init();
    for(var i = 0 ; i < x.length ; i++){
      var t = new Date(x[i].time);
      if(t <  tonight  &&                  x[i].distance < 1) N.today.LT1++;
      if(t <  tonight  &&                  x[i].distance < 3) N.today.LT3++;
      if(t <  tonight  &&                  x[i].distance < 5) N.today.LT5++;
      if(t >= tonight  && t <  tomorrow && x[i].distance < 1) N.tomorrow.LT1++;
      if(t >= tonight  && t <  tomorrow && x[i].distance < 3) N.tomorrow.LT3++;
      if(t >= tonight  && t <  tomorrow && x[i].distance < 5) N.tomorrow.LT5++;
      if(                 t >= tomorrow && x[i].distance < 1) N.thisweek.LT1++;
      if(                 t >= tomorrow && x[i].distance < 3) N.thisweek.LT3++;
      if(                 t >= tomorrow && x[i].distance < 5) N.thisweek.LT5++;
    }
  }
}]);
