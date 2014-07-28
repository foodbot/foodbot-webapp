angular.module('app.home.logo', [])

.directive("logo", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/logo/template.html', 
  };
});


