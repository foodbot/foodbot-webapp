angular.module('app.home.searchBar', [])
.directive("searchBar", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchBar/template.html', 
  };
});

