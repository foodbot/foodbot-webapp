window.app = angular.module('feed-me', [ 'ngRoute', 'ngMap', 'angularMoment', 'angularSpinner']);

// CORS: SET-UP IN ANGULAR-JS
// http://stackoverflow.com/questions/17756550/angularjs-cors-issues
// https://github.com/angular/angular.js/pull/1047
window.app.config(['$httpProvider',
    function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);
