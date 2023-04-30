fetch('ports.json')
    .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        updatePorts(ports);
        loadPorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM
    });

function updatePorts(ports) {
    let coordenadasLat = new Array(ports.length); //Coordenadas de latitud
    let coordenadasLon = new Array(ports.length); //Coordenadas de longitud
    let capacidades = new Array(ports.length); //Capacidades de los puertos
    let nombres = new Array(ports.length); //Array de nombres de los puertos
    // Mostrar la información de cada puerto en el HTML
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        const portName = port.name;
        //console.log(port.name);
        //const portDesc = port.description;
        const portGeo = port.geo;
        const portCapacitat = port.additionalProperty && port.additionalProperty.maxValue;
        
        /*
        //Nom
        const portNameElement = document.getElementById(`port-name${i}`);
        portNameElement.textContent = portName;

        //Descripció
        const portDescriptionElement = document.getElementById(`port-description${i}`);
        portDescriptionElement.textContent = portDesc;
        */
       
        //Localitació
        console.log(portGeo.latitude);
        coordenadasLat[i] = portGeo.latitude;
        console.log(portGeo.longitude);
        coordenadasLon[i] = portGeo.longitude;

        //Capacitat
        capacidades[i] = portCapacitat;

        //Nom
        nombres[i] = portName;

    }
    console.log(coordenadasLat[0]);
    console.log(coordenadasLon[0]);
    initMap(coordenadasLat, coordenadasLon, capacidades, nombres);
}


function initMap(latit, longi, capa, nomb) {
    if (typeof latit === 'undefined' || typeof longi === 'undefined' || typeof capa === 'undefined' || typeof nomb === 'undefined') {
        console.log("Són Undifined")
    }else{
        const palma = { lat: 39.6952635, lng: 3.0175719 };
        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: palma
        });
        for (let i = 0; i < latit.length; i++) {
            console.log(latit[i]);
            console.log(longi[i]);
            const marker = new google.maps.Marker({
                position: { lat: latit[i], lng: longi[i] },
                map: map,
            });
            // Agregar evento de clic al marcador
            marker.addListener('click', function () {
            const infoWindow = new google.maps.InfoWindow({
                content: `<strong>${nomb[i]}</strong><br>Capacidad: ${capa[i]}`
            });
            infoWindow.open(map, marker);
        });

        }
    }
}


function loadPorts(ports){
    const contenidorGeneral=document.getElementById("contenedorPrePuertos");
    var html='';
    var items=0;
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];//obtenim port
        const portName = port.name;
        //const portCapacitat=port.additionalProperty.maxValue;
        const portCapacitat = port.additionalProperty && port.additionalProperty.maxValue;
        const valoracion=port.aggregateRating.ratingValue;


        if(items%4==0){//si començam nova columna
            html+='<div class="row equal-width mt-5">';
        }
        //afegim ports
        html+= `
        <div class="col-md-3">
          <div class="card">
            <a href="puerto.html"><img class="card-img-top" src="portI5.jpg" alt="Card image cap"></a>
            <div class="card-body">
              <h5 class="card-title">`+portName+`</h5>
              <ul>
                <li>Capacidad:`+ portCapacitat+`</li>
              </ul>
              <div class="rating" id="rating">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <p class="valoracionPuertoPrev">5</p>
              </div>
            </div>
          </div>
        </div>
      `;
        if(items%4==0){//si acabam nova columna
            html+='</div>'
        }
        items++;
    }
    contenidorGeneral.innerHTML=html; //actualitzam contingut
}

fetch('ports.json')
  .then(response => response.json())
  .then(data => {
    const ports = data.itemListElement; // Obtener todos los puertos del array
    updatePorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM

    const cards = document.querySelectorAll('.card'); // Seleccionar todas las tarjetas

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const portId = card.getAttribute('id'); // Obtener el identificador único de la tarjeta
        const portUrl = `puerto.html?id=${portId}`; // Construir la URL de la página específica del puerto
        
        window.location.href = portUrl; // Redirigir a la página específica del puerto
      });
    });
  });






