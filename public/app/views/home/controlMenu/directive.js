angular.module('app.home.controlMenu', [])
.directive("fbControlMenu", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/controlMenu/template.html', 
  };
});

