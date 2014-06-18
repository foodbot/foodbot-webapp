var fbEventsDisplay = angular.module('fbEventsDisplay', []);

fbEventsDisplay.directive("fbEventsDisplay", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/modules/fbEventsDisplay/template.html', 
  };
});

