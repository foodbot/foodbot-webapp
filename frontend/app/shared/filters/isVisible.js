app.filter('isVisible', function($filter){
  return function(event, scope) {
    return $filter('time')(event, scope) && $filter('radius')(event, scope);
  }
});
