angular.module('app.home.filters')

//returns the base url from a url-string
.filter('baseUrlName', function(){
  return function(str) {
    var pathArray = str.split('/');
    var protocol = pathArray[0];
    var host = pathArray[2];
    host = host.replace(/www\.|\.com|\.net|\.org|\.info/g, "");
    host = host.substring(0,1).toUpperCase()+host.substring(1);
    return host;
  };
});
