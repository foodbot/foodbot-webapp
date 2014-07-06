angular.module('app.home.eventList', [])

.directive("eventList", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/eventList/template.html', 
  };
});

