angular.module('shim.underscore', [])

.service('_', function(){
  return window._;
});
