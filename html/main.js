fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        updatePorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM
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
        //Localitació
        coordenadasLat[i] = portGeo.latitude;
        coordenadasLon[i] = portGeo.longitude;

        //Capacitat
        capacidades[i] = portCapacitat;

        //Nom
        nombres[i] = portName;

    }
    initMap(coordenadasLat, coordenadasLon, capacidades, nombres);
}


function initMap(latit, longi, capa, nomb) {
    if (typeof latit === 'undefined' || typeof longi === 'undefined' || typeof capa === 'undefined' || typeof nomb === 'undefined') {
        console.log("Són Undifined")
    }else{
        const palma = { lat: 39.6952635, lng: 3.0175719 };
        var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: palma
        });
        for (let i = 0; i < latit.length; i++) {
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


function loadPorts(ports) {
  const contenidorGeneral = document.getElementById("contenedorPrePuertos");
  var html = '';
  var items = 0;
  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    const portName = port.name;
    const portCapacitat = port.additionalProperty && port.additionalProperty.maxValue;
    const portImage = port.image[1];
    const valoracion = port.aggregateRating.ratingValue;

    if (items % 4 == 0) {
      html += '<div class="row equal-width">';
    }
    html += `
      <div class="col-md-3">
        <div class="card">
          <a href="puerto.html?portId=${i}"><img class="card-img-top" src="` + portImage + `" alt="Card image cap"></a>
          <div class="card-body">
            <h5 class="card-title">` + portName + `</h5>
            <ul>
              <li>Capacidad: ` + portCapacitat + `</li>
            </ul>
    `;

    if(valoracion < 0.5){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 0.5) && (valoracion < 1)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star-half checked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 1.0) && (valoracion < 1.5)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 1.5) && (valoracion < 2.0)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half checked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 2.0) && (valoracion < 2.5)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 2.5) && (valoracion < 3.0)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half checked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 3.0) && (valoracion < 3.5)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star unchecked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 3.5) && (valoracion < 4.0)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half checked"></span>
          <span class="fa fa-star unchecked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 4.0) && (valoracion < 4.5)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half checked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }else if((valoracion >= 4.5) && (valoracion < 5.0)){
      html += `
        <div class="rating" id="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <p class="valoracionPuertoPrev">` + valoracion + `</p>
        </div>
      `;
    }

    html += `
          </div>
        </div>
      </div>
    `;
    items++;
    if (items % 4 == 0) {
      html += '</div>'; // Cerrar la fila después de agregar cuatro tarjetas
    }
  }
  contenidorGeneral.innerHTML = html;
}




