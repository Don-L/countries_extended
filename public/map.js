var Map = function(latLng, zoom) { 

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
      title: title 
    })
    return marker;
  };


}

