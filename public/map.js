var Map = function(latLng, zoom) {  //our map constructor

  this.googleMap = new google.maps.Map(document.getElementById('map'), {
    center: latLng,
    zoom: zoom
  });

  this.addInfoWindow = function(latLng, title) {
    var marker = this.addMarker(latLng, title);
    marker.addListener('click', function() {
      var contentString = '<h1>THANK YOU FOR CLICKING ON THE MARKER I REALLY AM MOST GRATEFUL CHEERS</h1>';
      var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
      infowindow.open(this.map, this); //we can use this.map because addMarker has a map
    })
  };

  this.addMarker = function(latLng, title) {
    var marker = new google.maps.Marker({
      position: latLng,
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

