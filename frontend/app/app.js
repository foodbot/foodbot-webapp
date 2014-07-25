var app = angular.module('app', [
  'ngRoute',
  'ngMap',
  'angularMoment',
  'angularSpinner',
  'app.home',
]);

// CORS: SET-UP IN ANGULAR-JS
// http://stackoverflow.com/questions/17756550/angularjs-cors-issues
// https://github.com/angular/angular.js/pull/1047
app.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
app.config(function($routeProvider, mapOptions) {
  $routeProvider.when('/', {
    templateUrl:'/app/views/home/template.html',
    controller:'homeController'
  });
});

