fetch('ports.json')
    .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        updatePorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM
    });

function updatePorts(ports) {
    //var coordenadasLat = new Array(ports.length); //Coordenadas de latitud
    //var coordenadasLon = new Array(ports.length); //Coordenadas de longitud
    // Mostrar la información de cada puerto en el HTML
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        const portName = port.name;
        const portDesc = port.description;
        //const portGeo = port.geo;

        //Nom
        const portNameElement = document.getElementById(`port-name${i}`);
        portNameElement.textContent = portName;

        //Descripció
        const portDescriptionElement = document.getElementById(`port-description${i}`);
        portDescriptionElement.textContent = portDesc;

        //Localitació
        //console.log(portGeo.latitude);
        //coordenadasLat[i] = portGeo.latitude;
        //console.log(portGeo.longitude);
        //coordenadasLon[i] = portGeo.longitude;
        //const portGeoElement = document.getElementById(`port-geo${i}`);
        //portGeoElement.textContent = portgeo;

    }
    //console.log(coordenadasLat[0]);
    //console.log(coordenadasLon[0]);
    initMap();
}


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