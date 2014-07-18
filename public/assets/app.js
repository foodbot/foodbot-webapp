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
app.config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
app.config(function($routeProvider, mapOptions) {
  $routeProvider.when('/', {
    templateUrl:'/app/views/home/template.html',
    controller:'homeController'
  });
});


angular.module('shared.mapConstants', [])


// http://snazzymaps.com/style/1/pale-dawn
// INIT W/ COORDINATES OF SAN FRANCISCO
.constant('mapOptions', {
  'nightblue':{ 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12, "styles": [{"featureType":"water","stylers":[{"color":"#021019"}]},{"featureType":"landscape","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"transit","stylers":[{"color":"#146474"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]}]},
  'candy':{ 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12, "styles": [{"featureType":"landscape","stylers":[{"hue":"#FFE100"},{"saturation":34.48275862068968},{"lightness":-1.490196078431353},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FF009A"},{"saturation":-2.970297029703005},{"lightness":-17.815686274509815},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FFE100"},{"saturation":8.600000000000009},{"lightness":-4.400000000000006},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00C3FF"},{"saturation":29.31034482758622},{"lightness":-38.980392156862735},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF19"},{"saturation":-30.526315789473685},{"lightness":-22.509803921568633},{"gamma":1}]}]},
  'applemapesque':{ 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12, "styles": [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}]},
  'default':{ 'panControl': false, mapTypeControl:false, 'zoomControlOptions' : { 'style': google.maps.ZoomControlStyle.LARGE, 'position': google.maps.ControlPosition.RIGHT_CENTER }, 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12},
  'neonworld':{ 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12, "styles": [{"stylers":[{"saturation":50},{"gamma":0.3}]}]},
  'paledown':{ 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12, "styles": [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]},
  'gowala':{ 'center': new google.maps.LatLng(37.7, -122.4), 'zoom': 12, "styles": [{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]}]},
})

.constant('highlightMarkerUri', 'http://maps.google.com/mapfiles/marker_orange.png')
.constant('normalMarkerUri', 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png')
.constant('pinMarkerUri', "https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star%7Chome%7Cb2182b%7CFFFFFF");
app.filter('capitalize', function(){
  return function(input, scope) {
      if (input!=null) input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
});

app.filter('isVisible', function($filter){
  return function(event, scope) {
    return $filter('time')(event, scope) && $filter('radius')(event, scope);
  }
});

app.filter('radius', function(mapCenterManager){
  mapDistance = function(event){
    var pos   = mapCenterManager.get()
    var lat1  = (Math.PI / 180) * pos.lat()   ;
    var lat2  = (Math.PI / 180) * event.venue.address.latitude ;
    var lon1  = (Math.PI / 180) * pos.lng() ; 
    var lon2  = (Math.PI / 180) * event.venue.address.longitude ;
    var x     = (lon2-lon1) * Math.cos((lat1+lat2)/2);
    var y     = (lat2-lat1);
    var R     = 6371;
    var km2miles = 0.621371192;
    return Math.sqrt(x*x + y*y) * R * km2miles ;
  };

  return function(event){
    var result = mapDistance(event);
    var radius = mapCenterManager.getRadius();
    return  result < radius ; 
  };
});

app.filter('time', function(timeManager){
  return function(event, scope) {
    var aTime = new Date(event.time);
    if(scope.timeframe === "today"){
      return aTime < timeManager.tonight();
    } else if(scope.timeframe === "tomorrow"){
      return aTime >= timeManager.tonight() && aTime < timeManager.tomorrow();
    } else if(scope.timeframe === "later"){
      return aTime >= timeManager.tomorrow() ;
    } 
    return true;
  };
});

app.service('countManager', function(timeManager){

  var N = {
    'today'   :{'LT1':0,'LT3':0,'LT5':0},
    'tomorrow':{'LT1':0,'LT3':0,'LT5':0},
    'thisweek':{'LT1':0,'LT3':0,'LT5':0}
  };

  init = function(){
    for(var i in N) for(var j in N[i]) N[i][j] = 0;
  };

  this.get =function(time, distance){
    return N[time][distance];
  };

  this.update = function(x){
    var tonight = timeManager.tonight();
    var tomorrow= timeManager.tomorrow();
    init();
    for(var i = 0 ; i < x.length ; i++){
      var t = new Date(x[i].time);
      if(t <  tonight  &&                  x[i].distance < 1) N.today.LT1++;
      if(t <  tonight  &&                  x[i].distance < 3) N.today.LT3++;
      if(t <  tonight  &&                  x[i].distance < 5) N.today.LT5++;
      if(t >= tonight  && t <  tomorrow && x[i].distance < 1) N.tomorrow.LT1++;
      if(t >= tonight  && t <  tomorrow && x[i].distance < 3) N.tomorrow.LT3++;
      if(t >= tonight  && t <  tomorrow && x[i].distance < 5) N.tomorrow.LT5++;
      if(                 t >= tomorrow && x[i].distance < 1) N.thisweek.LT1++;
      if(                 t >= tomorrow && x[i].distance < 3) N.thisweek.LT3++;
      if(                 t >= tomorrow && x[i].distance < 5) N.thisweek.LT5++;
    }
  };
});

app.service('FeedmeManager', function($http){
  return {
    get: function(addr){
      var time = new Date();
      time.setHours(0,0,0,1);
      return $http.get('http://localhost:8000/api?address='+addr+'&time='+time.getTime());
      // return $http.get('http://feedmeapi.cloudapp.net/api?address='+addr+'&time='+time.getTime());
    }
  };
});

//http://proccli.com/2013/10/angularjs-geolocation-service
app.service('geoapiManager', function($http, $q, $window, $rootScope){
  var position0 = {'latitude': 37.7,'longitude':-122.4}; // San Francisco
  var position = position0;
  var uri = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&' ;

  this.init = function(){
    var deferred = $q.defer();
    if (!$window.navigator) {
        $rootScope.$apply(function(){ deferred.resolve(position0)})
    } else {
      $window.navigator.geolocation.getCurrentPosition(function(position){
        $rootScope.$apply(function(){ deferred.resolve(position.coords)})
      }, function (error) {
        $rootScope.$apply(function(){ deferred.reject(position0)})
      });
    }
    return deferred.promise;
  };

  this.getLatLng  = function(addr){ 
    return $http.get(uri+'address='+ addr); 
  };

  this.getAddress = function(coord){ 
    return $http.get(uri+'latlng=' +coord.latitude+','+coord.longitude); 
  };

});

app.service('mapCenterManager',function($rootScope, pinMarkerUri){
  var radius = 5 ; // in miles
  this.center = null;
  this.home = null;

  this.lat  = function(){ return this.home.getPosition().lat(); };

  this.lng  = function(){ return this.home.getPosition().lng() ; };

  this.get  = function(){ return this.home.getPosition() ; };

  this.getRadius = function(){ return radius ; }

  this.setRadius = function(val){ radius = val; }

  this.init = function(position, scope, map){
    this.home && this.home.setMap(null);
    this.scope = scope;
    this.center && this.center.setMap(null);
    this.center && google.maps.event.clearListeners(this.center, "dragend");
    var pinImage = new google.maps.MarkerImage(pinMarkerUri,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34));
    this.home = new google.maps.Marker({ 
      'title': 'My position', 
      'map': map,
      'draggable':true, 
      'position': new google.maps.LatLng(position.latitude, position.longitude), 
      'icon': pinImage
    });
    if(!this.home.getPosition) debugger;
    this.set(this.home.getPosition());
    google.maps.event.addListener(this.home, "dragend", function(MapCenterService, $scope){
      return function(event) { 
        var position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        MapCenterService.scope.address = position.lat()+','+position.lng();
        MapCenterService.set(position);
        MapCenterService.scope.update();
        scope.$emit('dragend:home');
      }
    }(this, scope));
    google.maps.event.addListener(map, 'zoom_changed', function(MapCenterService) {
      return function(event){
        MapCenterService.set(MapCenterService.get())
      }
    }(this));
  };

  this.set  = function(pos){
    if(!this.scope.mapWrapper.getBounds()) return;
    var ne            = this.scope.mapWrapper.getBounds().getNorthEast();
    var sw            = this.scope.mapWrapper.getBounds().getSouthWest();
    var delta         = Math.abs(ne.lng()-sw.lng()) ;
    if(!this.home){
      this.home       = pos;
      var lat         = pos.lat();
      var lng         = pos.lng();
    } else{
      var lat         = .5 * (pos.lat()+this.lat());
      var lng         = .5 * (pos.lng()+this.lng());
    }
    var offset = new google.maps.LatLng(lat, lng + delta*.25*(-1));
    this.scope.mapWrapper.setCenter(offset); 
  };
});

app.service('mapManager', function($rootScope, $filter, geoapiManager, mapCenterManager, mapRouteManager, mapMarkerManager, highlightMarkerUri, normalMarkerUri, pinMarkerUri, mapOptions){
  var radius, center ; 
  this.element        = document.getElementById('map');

  this.get            = function(){ return this.mapWrapper; };

  this.getCenter      = function(){ return mapCenterManager.get();};

  this.set            = function(anAddress){
    return geoapiManager.getLatLng(anAddress).then(function(mapManager){
      return function(addr){
        var loc = addr.data.results[0].geometry.location;
        var pos = {latitude:loc.lat, longitude:loc.lng};
        mapCenterManager.init(pos, mapManager.scope, mapManager.get());
        mapManager.setRadius();
      }
    }(this));
  };

  this.getRadius      = function(){ return radius };

  this.setRadius      = function(){
    radius && radius.setMap(null);
    radius = new google.maps.Circle({
      'strokeColor'   : '#b2182b',
      'strokeOpacity' : 0.7,
      'strokeWeight'  : 4,
      'fillColor'     : '#b2182b',
      'fillOpacity'   : 0.0,
      'map'           : this.mapWrapper,
      'center'        : mapCenterManager.get(),
      'radius'        : mapCenterManager.getRadius() * 1.624 * 1000  
    });

  };

  this.update           = function(events){
    mapMarkerManager.flush();
    for (var i = 0; i < events.length ; i++) {
      if($filter('isVisible')(events[i], this.scope)){
        mapMarkerManager.mixin(events[i], this.get());
      } 
    }
  };

  this.init           = function(scope){
    this.scope        = scope;
    this.mapWrapper = scope.mapWrapper = new google.maps.Map(map, mapOptions.default);
    this.address      = scope.address;
    $rootScope.$on('dragend:home', function(mapManager){
      return function(event){ mapManager.setRadius()}
    }(this));
    return geoapiManager.init().then(function(position){
      var point = new google.maps.LatLng(position.latitude, position.longitude);
      mapCenterManager.init(position, scope, scope.mapWrapper);
      mapRouteManager.init(scope.mapWrapper);
      // ON WINDOW RESIZE, AUTO RE-CENTER THE MAP
      google.maps.event.addDomListener(window, 'resize', function(event) {
        mapCenterManager.set(mapCenterManager.get()); 
      });
      // CHANGE ADDRESS FOR THE FORMATTED ONE GIVEN LAT-LON OF BROWSER 
      geoapiManager.getAddress(position).then(function(res){
        scope.address = res.data.results[0].formatted_address;
      });
    })
  };
});

app.service('mapMarkerManager', function(mapRouteManager, mapCenterManager, highlightMarkerUri){

  var storage = [];

  this.flush = function(){ 
    while(storage.length > 0) storage.pop().setMap(null);
  };
  
  this.length = function(){ 
    return storage.length;        
  };

  this.closeWindow = function(){ 
    this.lastInfo && this.lastInfo.close(); 
  };
  
  this.onClick = function(marker){
    this.lastInfo = marker.infoWindow;
    this.lastInfo.open(marker.getMap(), marker);
  };
  
  this.mixin = function(event, map){ 
    var venue       = event.venue.address;
    var marker      = new google.maps.Marker({ 'title': event.title });
    var position    = new google.maps.LatLng(venue.latitude, venue.longitude);
    marker.setPosition(position);
    marker.setMap(map);
    var text        = '<b><a href="'+event.unique+'">'+event.name+'</a></b><br><p><a href="'+event.unique+'">'; 
    text            += event.description.length>143?event.description.slice(0,143)+' ...':event.description ;
    text            += '</a><address><strong>@ '+event.venue.name+'</strong> ';
    text            += '<a href="'+event.unique+'">'+venue.address1+'</a>';
    text            += ' - ' + venue.city;
    marker.infoText   = text;
    marker.infoWindow = new google.maps.InfoWindow({ 
      'content': text, 
      'maxWidth':300,
      'position':position
    });
    storage.push(marker);
    event.marker          = marker;
    // http://stackoverflow.com/questions/7044587/adding-multiple-markers-with-infowindows-google-maps-api
    google.maps.event.addListener(marker, 'click', function(
          event, 
          mapMarkerManager, 
          mapCenterManager, 
          mapRouteManager) {
      return function() {
        mapMarkerManager.closeWindow();
        mapMarkerManager.onClick(event.marker);
        mapRouteManager.get(mapCenterManager.get(), event.marker.getPosition());
        mapCenterManager.set(event.marker.getPosition());
      }
    }(event, 
      this, 
      mapCenterManager, 
      mapRouteManager));
    event.highlightMarker = function(){ this.marker.setIcon(highlightMarkerUri); };
    event.normalizeMarker = function(){ this.marker.setIcon(null); };
    return event;
  };
});

app.service('mapRouteManager', function($rootScope, mapCenterManager){

  var dest = null;

  this.rendererOptions   = { 
    'draggable': true, 
    'preserveViewport': true
  };

  this.directionsDisplay = new google.maps.DirectionsRenderer(this.rendererOptions);

  this.directionsService = new google.maps.DirectionsService();

  this.getDestination = function(){ return dest; };
  
  this.setDestination = function(position){ dest = position }; 

  this.init = function(map){
    this.directionsDisplay.setMap(map); 
    google.maps.event.addListener(this.directionsDisplay, 'directions_changed', 
      function(mapCenterManager, mapRouteManager){
        return function() { mapCenterManager.set(mapRouteManager.getDestination()); };
      }(mapCenterManager, this)
    );

  };

  this.get = function(orig, dest){
    this.setDestination(dest);
    request = {
      'origin'      : orig,
      'destination' : this.getDestination(),
      'travelMode'  : google.maps.TravelMode.WALKING 
    };
    this.directionsService.route(request, function(mapRouteManager){
      return function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          mapRouteManager.directionsDisplay.setDirections(response);
        }
      }
    }(this));
    $rootScope.$on('dragend:home', function(mapRouteManager){
      return function(event){ 
        debugger;
        mapRouteManager.directionsDisplay.setMap(null);
      }
    }(this));

  }
});

app.service('spinnerManager', function(usSpinnerService){
  var isSpinning = true;
  return {
    'get'   : function(){ return isSpinning; }, 
    'start' : function(){ 
      if(!isSpinning){
        usSpinnerService.spin('spinner-1');  
        isSpinning = true;
      } 
    },
    'stop'  : function(){
      usSpinnerService.stop('spinner-1');  
      isSpinning = false;
    }
  };
});

app.service('timeManager', function(){
  var weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  moment.lang('en', weekdays);  
  return {
    'format': function(event){
      return moment(new Date(event.time)).calendar().replace(/(Today at )|(Tomorrow at )/,'');
    },
    'tonight':  function(){
     var tonight = new Date(); 
     tonight.setHours(23,59,59,999); 
     return tonight
    },
    'tomorrow':function(){
      var tonight = new Date(); 
      tonight.setHours(23,59,59,999); 
      var tomorrow = new Date(
      tonight.getFullYear(),
      tonight.getMonth(), 
      tonight.getDate()+1);
      tomorrow.setHours(23,59,59,999);
      return tomorrow;
    } 
  }
});

angular.module('app.home', [
  'app.home.logo',
  'app.home.searchBar',
  'app.home.searchResults',
  'ngMap',
  'angularMoment',
  'angularSpinner',
  'shared.mapConstants',
])

.controller('homeController', function($scope, $timeout, $filter, $location, $window, mapManager, mapCenterManager, mapRouteManager, spinnerManager, countManager, timeManager, FeedmeManager){

  $scope.address    = 'San Francisco';
  $scope.predicate  = 'time';
  $scope.reverse    = false;
  $scope.timeframe  = 'today';
  $scope.isVisible  = function(event){return $filter('isVisible')(event, $scope)};
  $scope.radius     = 5;
  $scope.tableHeight= .7*$window.innerHeight;
  $scope.hasEvents  = false;
  $scope.showRoute  = function(event){
    mapRouteManager.get(mapCenterManager.get(), event.marker.getPosition());
  };

  // DELAY ON SEARCH BOX 
  var tempAddress   = '';
  $scope.filterAddressTimeout;
  $scope.getCount   = countManager.get;

  $scope.update               = function(){
    spinnerManager.start();
    // FeedmeManager.get($scope.filterAddress).then(function(res){ 
    FeedmeManager.get($scope.filterAddressTimeout).then(function(res){ 
      $scope.events           = res.data.results; 
      for(var i = 0 ; i < $scope.events.length ; i++){
        $scope.events[i].showDescription= false ;
        $scope.events[i].showTags       = false ;
        $scope.events[i].marker         = null  ;
        $scope.events[i].timeFMT        = timeManager.format($scope.events[i]);
        if($scope.events[i].description.length > 283){
          $scope.events[i].text = $scope.events[i].description.slice(0,283)+' ...';
        } else {
          $scope.events[i].text = $scope.events[i].description;
        }
      }
      countManager.update($scope.events);   
      return mapManager.update($scope.events);
    }).then(function(){
      spinnerManager.stop();
    });
  };

  spinnerManager.start();
  mapManager.init($scope).then(function(position){
    $scope.update();
    $scope.$watch('radius', function(val){
      mapCenterManager.setRadius(val);
      mapManager.setRadius();
      $scope.update();
    });
    $scope.$watch('timeframe', function(val){
      $scope.update();
    });
    $scope.$watch('address', function(val){
      if($scope.filterAddressTimeout) $timeout.cancel($scope.filterAddressTimeout);
      tempAddress = val;
      filterAddressTimeout      = $timeout(function() {
        $scope.filterAddressTimeout = tempAddress;
        mapManager.set($scope.filterAddressTimeout).then(function(){
          $scope.update();
        });
      }, 800);
    });
  });
});


angular.module('app.home.logo', [])

.directive("logo", function(){
  var template =
                '<div class="hme_logo">'+
                  '<img class="logo" src="/app/views/home/logo/foodbot.png"/>'+
                '</div>';
  return {
    restrict: 'E',
    template: template, 
  };
});



angular.module('app.home.searchBar', [])
.directive("searchBar", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchBar/template.html', 
  };
});


angular.module('app.home.searchResults', [])

.directive("searchResults", function(){
  return {
    restrict: 'E',
    templateUrl: '/app/views/home/searchResults/template.html', 
  };
});

