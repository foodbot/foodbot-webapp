angular.module('app.home.logo', [])

.directive("logo", function(){
  var template =
                '<div class="hme_logo">'+
                  '<img class="logo" src="/app/views/home/logo/foodbot.png"/>'+
                '</div>';
  return {
    restrict: 'E',
    template: template, 
  };
});


