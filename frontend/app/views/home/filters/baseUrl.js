angular.module('app.home.filters')

//returns the base url from a url-string
.filter('baseUrl', function(){
  return function(str) {
    var pathArray = str.split('/');
    var protocol = pathArray[0];
    var host = pathArray[2];
    var url = protocol + '//' + host;
    return url;
  };
});
