fetch('ports.json')
    .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        updatePorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM
    });
    const apiKey = '7ee27410d43b852ca993e17f18a42e5a';
    const apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=Pa
    lma+de+Mallorca&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
     console.log(data);
     const temperature = data.main.temp;
     const description = data.weather[0].description;
     console.log(`La temperatura en Mallorca es de
    ${temperature} grados Celsius. ${description}`);
     })
     .catch(error => console.error(error));

function updatePorts(ports) {
    var coordenadasLat = new Array(ports.length); //Coordenadas de latitud
    var coordenadasLon = new Array(ports.length); //Coordenadas de longitud
    // Mostrar la información de cada puerto en el HTML
    for (let i = 0; i < ports.length; i++) {
        var port = ports[i];
        var portName = port.name;
        var portDesc = port.description;
        var portGeo = port.geo;

        //Nom
        var portNameElement = document.getElementById(`port-name${i}`);
        portNameElement.textContent = portName;

        //Descripció
        var portDescriptionElement = document.getElementById(`port-description${i}`);
        //portDescriptionElement.textContent = portDesc;

        var shortDescription = portDesc.slice(0, 150);
        portDescriptionElement.textContent = shortDescription + (portDesc.length > 50 ? "..." : "");

        //Localitació
        console.log(portGeo.latitude);
        coordenadasLat[i] = portGeo.latitude;
        console.log(portGeo.longitude);
        coordenadasLon[i] = portGeo.longitude;
        //const portGeoElement = document.getElementById(`port-geo${i}`);
        //portGeoElement.textContent = portgeo;

    }
    console.log(coordenadasLat[0]);
    console.log(coordenadasLon[0]);
    initMap(coordenadasLat, coordenadasLon);
}


function initMap(lat, lon) {
    const palma = { lat: 39.6952635, lng: 3.0175719 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: palma
    });
    
    for (let i = 0; i < lat.length; i++) {
        console.log(lat[i]);
        console.log(lon[i]);
        const marker = new google.maps.Marker({
            position: { lat: lat[i], lng: lon[i] },
            map: map,
        });
    }
}









