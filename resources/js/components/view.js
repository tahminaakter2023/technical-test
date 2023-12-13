import { Modal } from "bootstrap";

class View {
    constructor(data) {
        this.renderedElement = document.getElementById('mapModal');
        this.data = data;   
        this.bindEvents();
    }

    bindEvents() {
        var myModal = new Modal(this.renderedElement, {
            keyboard: false
        });
        this.loadGoogleMaps();
        // update modal title
        const modalTitle = this.renderedElement.querySelector(".modal-title");
        modalTitle.innerHTML = this.data.name;
        myModal.show();
    }

    loadGoogleMaps() {
        if (typeof google === 'object' && typeof google.maps === 'object') {
            this.initMap();
        } else {
            setTimeout(this.loadGoogleMaps, 500); // Check again in 500 ms
        }
    }

    initMap() {
        const location = this.data.location;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: new google.maps.LatLng(location.lat, location.lng)
        });
      
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map
        });
      
        var infowindow = new google.maps.InfoWindow();
      
        marker.addListener('click', function() {
          infowindow.setContent('<div><strong>' + this.data.name + '</strong><br>' +
                                'Lat: ' + location.lat + '<br>Lng: ' + location.lng + '</div>');
          infowindow.open(map, marker);
        });
      }
      
}

export default View;
