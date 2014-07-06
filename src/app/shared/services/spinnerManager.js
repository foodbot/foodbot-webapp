app.service('SpinnerManager', function(usSpinnerService){
  var isSpinning = true;
  return {
    'get'   : function(){ return isSpinning; }, 
    'start' : function(){ 
      if(!isSpinning){
        usSpinnerManager.spin('spinner-1');  
        isSpinning = true;
      } 
    },
    'stop'  : function(){
      usSpinnerManager.stop('spinner-1');  
      isSpinning = false;
    }
  };
});
