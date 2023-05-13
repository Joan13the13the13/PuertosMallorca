fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        infoPort(ports); //Llamar a la función para mostrar la información de un puerto
        loadPorts(ports); //
        loadImgs(ports);
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

  //Función para obtener toda la información que necesitamos para mostrar los restaurantes y playas
  function actualitzaPorts(ports) {
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


/* Funciones para la página de un puerto */
function infoPort(ports) {
    const urlParams = new URLSearchParams(window.location.search);
    const portId = urlParams.get('portId');
    const port = ports[portId];
    var puertoJsonString = JSON.stringify(port); //Passam el contingut del port a string
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
    var portVideo = port.subjectOf.video[0]; //Link del video del puerto
    var html = '';
    
    //Actualizamos el valor del script en el head para la web seméntica
    var scriptElement = document.getElementById('port-json');
    scriptElement.textContent = puertoJsonString;

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
      var player = new window.YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: '1l6u5IoUBQM',
          playerVars: {
              'autoplay': 1,
              'controls': 1
          }
      });
      
      console.log("Valor després:" + portVideo);
  }


function sacarDist(latitude, longitude){
  const distancia = Math.sqrt(latitude * latitude + longitude * longitude);
  return distancia;
}


function sacarDist(lat1, lon1,lat2,lon2){
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

//Graus a radians
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

//Funció per a obtenir ports més propers
function loadPorts(ports) {
  const contenidorGeneral = document.getElementById("contenedorPuertos");
  const urlParams = new URLSearchParams(window.location.search);
  const portId = urlParams.get('portId');
  const puerto = ports[portId];
  var html = '';
  var items = 0;

  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    if((sacarDist(puerto.geo.latitude,puerto.geo.longitude,port.geo.latitude,port.geo.longitude) < 20) && (puerto.name != port.name)){
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


function loadImgs(ports) {
  const urlParams = new URLSearchParams(window.location.search);
  const portId = urlParams.get('portId');
  const puerto = ports[portId];
  var images = puerto.image;
  var html = '<h2>Galería de Imágenes</h2>';

  var items = 0;

  const contenidorGeneral = document.getElementById("galeria-img");//obtenim contenidor


  for (let i = 0; i < images.length; i++) {
    if (items % 4 == 0) {
      html += '<div class="row">';
    }
    html += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img class="card-img-top img-fluid" src="${images[i]}" alt="Imagen ${i + 1}">
        </div>
      </div>
    `;
    items++;
    if (items % 4 == 0) {
      html += '</div>';
    }
  }
  contenidorGeneral.innerHTML=html;
}

