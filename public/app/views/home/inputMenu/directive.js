angular.module('app.home.inputMenu', [])
.directive("inputMenu", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/inputMenu/template.html', 
  };
});

