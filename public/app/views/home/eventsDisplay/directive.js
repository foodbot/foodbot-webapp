angular.module('app.home.eventsDisplay', [])

.directive("fbEventsDisplay", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/eventsDisplay/template.html', 
  };
});

