function initMap() {
    const palma = { lat: 39.6952635, lng: 3.0175719 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: palma
    });
    const marker1 = new google.maps.Marker({
        position: { lat: 39.561551, lng: 2.637003 },
        map: map,
    });
    const marker2 = new google.maps.Marker({
        position: { lat: 39.83864, lng: 3.131824 },
        map: map,
    });
}

initMap();