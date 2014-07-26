app.filter('isVisible', function($filter){
  return function(foodEvent, scope) {
    return $filter('time')(foodEvent, scope) && $filter('radius')(foodEvent);
  };
});
