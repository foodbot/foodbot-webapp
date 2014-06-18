app.service('TimeService', function(){
  var weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  moment.lang('en', weekdays);  
  return {
    'format': function(event){
      return moment(new Date(event.time)).calendar().replace(/(Today at )|(Tomorrow at )/,'');
    },
    'tonight':  function(){
     var tonight = new Date(); 
     tonight.setHours(23,59,59,999); 
     return tonight
    },
    'tomorrow':function(){
      var tonight = new Date(); 
      tonight.setHours(23,59,59,999); 
      var tomorrow = new Date(
      tonight.getFullYear(),
      tonight.getMonth(), 
      tonight.getDate()+1);
      tomorrow.setHours(23,59,59,999);
      return tomorrow;
    } 
  }
});
