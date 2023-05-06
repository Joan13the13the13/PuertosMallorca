fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        infoPort(ports); //Llamar a la función para mostrar la información de un puerto
        loadPorts(ports); //
        actualitzaPorts(ports);

        // Llamada a onYouTubeIframeAPIReady después de cargar los datos
        onYouTubeIframeAPIReady();
    });
    
 

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
  function actualitzaPorts(ports) {
    let coordenadasLat = new Array(ports.length); //Coordenadas de latitud
    let coordenadasLon = new Array(ports.length); //Coordenadas de longitud
    let capacidades = new Array(ports.length); //Capacidades de los puertos
    let nombres = new Array(ports.length); //Array de nombres de los puertos
    // Mostrar la información de cada puerto en el HTML
    console.log(ports.length)
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        const portName = port.name;
        console.log(portName);
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

var portVideo;
/* Funciones para la página de un puerto */
function infoPort(ports) {
    const urlParams = new URLSearchParams(window.location.search);
    const portId = urlParams.get('portId');
    console.log(portId);
    const port = ports[portId];
    //Atributos a mostrar del puerto
    const portName = port.name; //Nombre del puerto
    const portDesc = port.description //Descripción
    const portHoraES = port.openingHours[0]; //Horario de apertura entre semana
    const portHoraFS = port.openingHours[1]; //Horario de apertura en fin de semana
    const portAdressStr = port.address.streetAddress; //Calle
    const portAdressLoc = port.address.addressLocality; //Localidad
    const portAdressCod = port.address.postalCode; //Codigo postal
    const portSmoke = port.smokingAllowed; //Se puede fumar?
    const portRating = port.aggregateRating.ratingValue; //Valoración media
    const portRatingCount = port.aggregateRating.reviewCount; //Numero de valoraciones
    const portCapacity = port.additionalProperty.maxValue; //Capacidad del puerto
    const portTelephone= port.telephone; //Telefono del puerto
    const portCorreo = port.keywords.termCode; //Correo del puerto
    //const portWP = port.keywords.additionalType; //Pagina Web del puerto
    //const portFax = port.faxNumber; //Pagina Web del puerto
    //const portImages = port.image; //Array de imagenes del puerto
    portVideo = port.subjectOf.video[0]; //Link del video del puerto
    var html = '';
    
    //Nombre
    const portNameElement = document.getElementById(`port-name`);
    portNameElement.textContent = portName;

    ///Descripción
    const portDescrElement = document.getElementById(`port-descr`);
    portDescrElement.textContent = portDesc;

    //Telefono
    const portTelephoneElement = document.getElementById(`port-telephone`);
    portTelephoneElement.textContent = portTelephone;

    //Correo
    const portCorreoElement = document.getElementById(`port-correo`);
    portCorreoElement.textContent = portCorreo;

    //Horas de apertura entre semana
    const portHoraESElement = document.getElementById(`port-horaES`);
    portHoraESElement.textContent = portHoraES;

    //Horas de apertura fin de semana
    const portHoraFSElement = document.getElementById(`port-horaFS`);
    portHoraFSElement.textContent = portHoraFS;

    //Calle
    const portCalleElement = document.getElementById(`port-calle`);
    portCalleElement.textContent = portAdressStr;

    //Localidad
    const portLocaliyElement = document.getElementById(`port-locality`);
    portLocaliyElement.textContent = portAdressLoc;

    //Codigo postal
    const portPostalCodeElement = document.getElementById(`port-addressCode`);
    portPostalCodeElement.textContent = portAdressCod;

    //Codigo capacidad
    const portCapacityElement = document.getElementById(`port-capacidad`);
    portCapacityElement.textContent = portCapacity;

    //Permite fumar
    const portSmokeElement = document.getElementById(`port-smoke`);
    if(portSmoke){
        portSmokeElement.textContent = `Si`;
    }else{
        portSmokeElement.textContent = `No`;
    }

    //Valoración
    const portValoracioContenedor = document.getElementById(`contenedorValoracio`);
    if(portRating < 0.5){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 0.5) && (portRating < 1)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star-half checked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 1.0) && (portRating < 1.5)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 1.5) && (portRating < 2.0)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star-half checked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 2.0) && (portRating < 2.5)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 2.5) && (portRating < 3.0)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star-half checked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 3.0) && (portRating < 3.5)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star unchecked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 3.5) && (portRating < 4.0)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star-half checked"></span>
            <span class="fa fa-star unchecked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 4.0) && (portRating < 4.5)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star-half checked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }else if((portRating >= 4.5) && (portRating < 5.0)){
        html += `
          <div class="rating" id="rating">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <p class="valoracionPuertoPrev">` + portRating + `</p>
          </div>
          <p>Numero de valoraciones: ` + portRatingCount + `</p>
        `;
      }
  
      html += `
            </div>
          </div>
        </div>
      `;

    portValoracioContenedor.innerHTML = html;
  

}


    // Configura tu clave de API de YouTube aquí
    var apiKey = 'AIzaSyA1KsbfMVYG_UTUwQtAKS8VZ7Q_y6e60aM';
              
    // Carga la API de YouTube
    function onYouTubeIframeAPIReady() {
      console.log("Valor de port video a func youtube:" + portVideo);
        // Crea un reproductor de YouTube
        var player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: portVideo,
            playerVars: {
                'autoplay': 1,
                'controls': 1
            }
        });

        console.log("Valor després:" + player.videoId);

}


// Configura tu clave de API de YouTube aquí
var apiKey = 'AIzaSyA1KsbfMVYG_UTUwQtAKS8VZ7Q_y6e60aM';

// Carga la API de YouTube
function onYouTubeIframeAPIReady() {
    // Crea un reproductor de YouTube
    var player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: portVideo,
        playerVars: {
            'autoplay': 1,
            'controls': 1
        }
    });
}




function sacarDist(latitude, longitude){
  const distancia = Math.sqrt(latitude * latitude + longitude * longitude);
  return distancia;
}

function loadPorts(ports) {
  const contenidorGeneral = document.getElementById("contenedorPuertos");
  const urlParams = new URLSearchParams(window.location.search);
  const portId = urlParams.get('portId');
  console.log(portId);
  const puerto = ports[portId];
  var html = '';
  var items = 0;
  const maxDist = 0.044172;

  const distPuerto = sacarDist(puerto.geo.latitude, puerto.geo.longitude)

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    const distPort = sacarDist(port.geo.latitude, port.geo.longitude);
    if((Math.abs(distPuerto-distPort) < maxDist) && (puerto.name != port.name)){
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
          <a href="puerto.html?portId=${i}">
            <img class="card-img-top card-img" src="` + portImage + `" alt="Card image cap">
          </a>
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
  }
  contenidorGeneral.innerHTML = html;

}



function sacarDist(latitude, longitude){
  const distancia = Math.sqrt(latitude * latitude + longitude * longitude);
  return distancia;
}

function loadPorts(ports) {
  const contenidorGeneral = document.getElementById("contenedorPuertos");
  const urlParams = new URLSearchParams(window.location.search);
  const portId = urlParams.get('portId');
  console.log(portId);
  const puerto = ports[portId];
  var html = '';
  var items = 0;
  const maxDist = 0.044172;

  const distPuerto = sacarDist(puerto.geo.latitude, puerto.geo.longitude)

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    const distPort = sacarDist(port.geo.latitude, port.geo.longitude);
    if((Math.abs(distPuerto-distPort) < maxDist) && (puerto.name != port.name)){
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
          <a href="puerto.html?portId=${i}">
            <img class="card-img-top card-img" src="` + portImage + `" alt="Card image cap">
          </a>
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
  }
  contenidorGeneral.innerHTML = html;

}
