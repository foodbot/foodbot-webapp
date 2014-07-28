angular.module('shim.google', [])

.service('google', function(){
  return window.google;
});
