angular.module('app.home.searchResults', [])

.directive("searchResults", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchResults/template.html', 
  };
});

