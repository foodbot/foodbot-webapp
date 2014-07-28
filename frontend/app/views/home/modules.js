angular.module('app.home.managers', [
  'shared.appConstants',
  'shim.google'
]);
angular.module('app.home.filters', [
  'app.home.managers',
  'shim.google'
]);