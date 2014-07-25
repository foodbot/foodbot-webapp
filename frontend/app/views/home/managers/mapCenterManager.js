app.service('mapCenterManager',function($rootScope, pinMarkerUri){
  this.center = null;
  this.home = null;

  this.getHomePosition = function(){ return this.home.getPosition(); };

  this.init = function(position, scope, map){
    if(this.home){ this.home.setMap(null); }
    if(this.center){
      this.center.setMap(null);
      google.maps.event.clearListeners(this.center, "dragend");
    }
    // this.scope = scope;
    this.map = map;
    var pinImage = new google.maps.MarkerImage(
      pinMarkerUri,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34)
    );
    this.home = new google.maps.Marker({ 
      'title': 'My position', 
      'map': this.map,
      'draggable':true, 
      'position': new google.maps.LatLng(position.latitude, position.longitude), 
      'icon': pinImage
    });
    if(!this.home.getPosition) debugger;
    this.set(this.home.getPosition());

    // google.maps.event.addListener(this.home, "dragend", function(e) { 
    //   var position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
    //   this.scope.address = position.lat()+','+position.lng();
    //   this.set(position);
    //   // this.scope.update();
    //   $rootScope.$emit('dragend:home');
    // }.bind(this));
    google.maps.event.addListener(map, 'zoom_changed', function(e){
      this.refresh(); 
    }.bind(this));
  };
  this.setCoord = function(lat, lng){
    var position = new google.maps.LatLng(lat, lng);
    this.set(position);
  };
  this.set = function(pos){
    if(!this.map.getBounds()) return;
    this.home = this.home || pos;
    var ne            = this.map.getBounds().getNorthEast();
    var sw            = this.map.getBounds().getSouthWest();
    var delta         = Math.abs(ne.lng()-sw.lng());
    var lat           = 0.5 * (pos.lat()+this.getHomePosition().lat());
    var lng           = 0.5 * (pos.lng()+this.getHomePosition().lng());
    var offset = new google.maps.LatLng(lat, lng + delta*0.25*(-1));
    this.map.setCenter(offset); 
  };
  this.refresh = function(){
    this.set(this.get());
  };
});
