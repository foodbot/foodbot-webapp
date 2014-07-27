angular.module('app.home.searchResults', [])

.directive("searchResults", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchResults/template.html', 
    controller: function($scope){
      setTimeout(function(){
        // $('table').fixedHeaderTable({ footer: false, cloneHeadToFoot: false, fixedColumn: false });
        // $("table").stickyTableHeaders();
        console.log("stickyTable")
      }, 10000)
    }
  };
})
