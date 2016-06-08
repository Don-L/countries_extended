var Map = function(latLng, zoom) {  //our map constructor

  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: zoom
  });

  this.addInfoWindow = function(latLng, title, content) {
    var marker = this.addMarker(latLng, title);
    marker.addListener('click', function() {
      var infowindow = new google.maps.InfoWindow({
          content: content
        });
      infowindow.open(this.map, this); 
      return infowindow;
    })
  };

  this.addMarker = function(latLng, title) {
    var marker = new google.maps.Marker({
      position: latLng,
      label: '',
      map: this.googleMap,
      title: title //need to call key 'title' so google maps can use the property. we could have a label key as well as a title key if we wanted
    })
    return marker;
  };

  this.bindClick = function() {
    google.maps.event.addListener(this.googleMap, 'click', function(event){ //click is an event type provided by google. we need to reference it by placing its name in a string
      console.log(event);
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
      this.addMarker({lat: event.latLng.lat(), lng: event.latLng.lng()}, 'X');
    }.bind(this)); //binds 'this' in the bindclick method to Map
  };

  this.resetCenter = function(latLng) {
    this.googleMap.panTo(latLng);
  };


}

