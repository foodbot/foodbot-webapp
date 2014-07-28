angular.module('shim.jquery', [])

.service('$', function(){
  return window.$;
});
