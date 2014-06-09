app.config(function($routeProvider, mapOptions) {
  var config = {'templateUrl':'/templates/home.html', 'controller':'HomeController'};
  $routeProvider.when('/', config);
});

