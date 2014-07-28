angular.module('app.home.searchBar', [
  'app.home.managers',
  'shim.moment',
])
.directive("searchBar", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchBar/template.html',
    scope:{
      address: "=",
      timeframe: "=",
      radius: "=",
      foodEvents: "="
    },
    controller: function($scope, $timeout, $filter, countManager, apiManager, mapManager, timeManager, moment){
      var filterAddressTimeout;
      $scope.getCount = countManager.getCount;

      mapManager.init();
      moment.lang('en', {
        calendar : {
          lastDay : 'LT',
          sameDay : 'LT',
          nextDay : 'LT',
          lastWeek : '[last] dddd [at] LT',
          nextWeek : 'ddd - LT',
          sameElse : 'L'
        }
      });  
      var updateAddress = function(address){
        mapManager.setAddress(address);
        apiManager.getEvents(address)
        .then(function(res){ 
          var foodEvents = res.data.results; 
          for(var i = 0 ; i < foodEvents.length ; i++){  
            foodEvents[i].showDescription = false ;
            foodEvents[i].showTags        = false ;
            foodEvents[i].marker          = null ;
            foodEvents[i].timeFMT         = moment(new Date(foodEvents[i].time)).calendar() ;

            if(foodEvents[i].description.length > 283){
              foodEvents[i].text = foodEvents[i].description.slice(0,283)+' ...';
            } else {
              foodEvents[i].text = foodEvents[i].description;
            }
          }
          $scope.foodEvents = foodEvents;

          var filteredEvents = $scope.foodEvents.slice();
          filteredEvents = $filter('eventDistance')(filteredEvents, $scope.radius);
          filteredEvents = $filter('eventTime')(filteredEvents, $scope.timeframe);

          countManager.updateCount($scope.foodEvents);   
          mapManager.updateMarkers(filteredEvents);
        });
      };

      $scope.$watch('radius', function(val){
        mapManager.setRadius(val);
        if($scope.foodEvents){
          var filteredEvents = $scope.foodEvents.slice();
          filteredEvents = $filter('eventDistance')(filteredEvents, $scope.radius);
          filteredEvents = $filter('eventTime')(filteredEvents, $scope.timeframe);
          mapManager.updateMarkers(filteredEvents);
        }
      });
      $scope.$watch('timeframe', function(val){
        if($scope.foodEvents){
          var filteredEvents = $scope.foodEvents.slice();
          filteredEvents = $filter('eventDistance')(filteredEvents, $scope.radius);
          filteredEvents = $filter('eventTime')(filteredEvents, $scope.timeframe);
          mapManager.updateMarkers(filteredEvents);
        }
      });
      $scope.$watch('address', function(val){
        if(filterAddressTimeout) $timeout.cancel(filterAddressTimeout);
        filterAddressTimeout = $timeout(function() {
          updateAddress($scope.address);
        }, 800);
      });
    }
  };
});

