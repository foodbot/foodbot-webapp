app.service('SpinnerService', [
      'usSpinnerService'
    , function(usSpinnerService){
  var isSpinning = true;
  return {
    'get'   : function(){ return isSpinning; }, 
    'start' : function(){ 
      if(!isSpinning){
        usSpinnerService.spin('spinner-1');  
        isSpinning = true;
      } 
    },
    'stop'  : function(){
      usSpinnerService.stop('spinner-1');  
      isSpinning = false;
    }
  };
}]);
