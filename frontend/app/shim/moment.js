angular.module('shim.moment', [])

.service('moment', function(){
  return window.moment;
});
