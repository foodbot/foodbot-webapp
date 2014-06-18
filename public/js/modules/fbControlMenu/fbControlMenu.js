var fbControlMenu = angular.module('fbControlMenu', []);

fbControlMenu.directive("fbControlMenu", function(){
  return {
    restrict: 'E',
    templateUrl: '/js/modules/fbControlMenu/template.html', 
  };
});

