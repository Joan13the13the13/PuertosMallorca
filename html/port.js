var port; //puerto que tratamos actualmente en la pagina
//var playas; //array de playas
//var restaurantes; //array de restaurantes

let coordenadasLatRestaurantes = []; //Coordenadas de latitud de los restaurantes
let coordenadasLonRestaurantes = []; //Coordenadas de longitud de los restaurantes
let urlsRestaurantes = []; //URL de los restaurantes 
let nombresRestaurantes = []; //Array de nombres de los restaurantes 

let coordenadasLatCafeterias = []; //Coordenadas de latitud de las cafeterias
let coordenadasLonCafeterias = []; //Coordenadas de longitud de las cafeterias
let urlsCafeterias = []; //URLs de las cafeterias 
let nombresCafeterias = []; //Array de nombres de las cafeterias 

//Para leer nuestro fichero de puertos
fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        infoPort(ports); //Llamar a la función para mostrar la información de un puerto
        loadPorts(ports); 
        loadImgs(ports);
        //Para leer el fichero de restaurantes
        fetch('restaurante.json')
        .then(response => response.json())
          .then(data => {
              const restaurantes = data.itemListElement; // Obtener todos los puertos del array
              actualitzaRestaurantes(restaurantes,port);
          });
        //Para leer el fichero de cafeterias
        fetch('cafeterias.json')
        .then(response => response.json())
          .then(data => {
              const cafeterias = data.itemListElement; // Obtener todos los puertos del array
              actualitzaCafeterias(cafeterias,port);
              console.log("Vaig a executar el mapa");
              initMap(); //ejecutamos el initmap
          });
        
    });


    function actualitzaRestaurantes(restaurantes, port){
      var latitudPort = port.geo.latitude;
      var longitudPort = port.geo.longitude;
      // Mostrar la información de cada puerto en el HTML
      for (let i = 0; i < restaurantes.length; i++) {
        var restaurant = restaurantes[i];
        var latitudRest = restaurant.geo.latitude;
        var longitudRest = restaurant.geo.longitude;
        if((sacarDist(latitudPort, longitudPort,latitudRest,longitudRest) < 10)){
          coordenadasLatRestaurantes.push(latitudRest);
          coordenadasLonRestaurantes.push(longitudRest);
          var nom = restaurant.name;
          nombresRestaurantes.push(nom);
          var url = restaurant.url;
          urlsRestaurantes.push(url);
        }
      }
    }

    function actualitzaCafeterias(cafeterias, port){
      var latitudPort = port.geo.latitude;
      var longitudPort = port.geo.longitude;
      // Mostrar la información de cada puerto en el HTML
      for (let i = 0; i < cafeterias.length; i++) {
        var cafeteria = cafeterias[i];
        var latitudCaf = cafeteria.geo.latitude;
        var longitudCaf = cafeteria.geo.longitude;
        if((sacarDist(latitudPort, longitudPort,latitudCaf,longitudCaf) < 10)){
          coordenadasLatCafeterias.push(latitudCaf);
          coordenadasLonCafeterias.push(longitudCaf);
          var nom = cafeteria.name;
          nombresCafeterias.push(nom);
          var url = cafeteria.url;
          urlsCafeterias.push(url);
        }
      }
    }

    function initMap() {
      var latitud = port.geo.latitude;
      console.log("Latitud port = "+ latitud);
      var longitud = port.geo.longitude;
      console.log("Longitud port = "+ longitud);
      const init = { lat: latitud, lng:  longitud };
      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: init
      });
      //Per mostrar els marcadors dels restaurants
      for (let i = 0; i < coordenadasLatRestaurantes.length; i++) {
          var lat = parseFloat(coordenadasLatRestaurantes[i]);
          var lon = parseFloat(coordenadasLonRestaurantes[i]);
          // Define el color del marcador (en este ejemplo, rojo)
          var color = 'blue';

          // Crea un icono personalizado con el color seleccionado
          var icon = {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeOpacity: 1,
            strokeWeight: 1,
            scale: 5
          };
          const marker = new google.maps.Marker({
              position: { lat: lat, lng: lon},
              map: map,
              icon: icon
          });
          console.log("Marker mostrado Lat = "+ lat +" Lon = "+ lon);
          // Agregar evento de clic al marcador
          marker.addListener('click', function () {
          const infoWindow = new google.maps.InfoWindow({
              content: `<a href="${urlsRestaurantes[i]}" target="_blank"><strong>${nombresRestaurantes[i]}</strong></a>`
          });
          infoWindow.open(map, marker);
        });

      }
      
      //Per mostrar els marcadors de les cafeteries
      for (let i = 0; i < coordenadasLatCafeterias.length; i++) {
        var lat = parseFloat(coordenadasLatCafeterias[i]);
        var lon = parseFloat(coordenadasLonCafeterias[i]);
        // Define el color del marcador (en este ejemplo, rojo)
        var color = 'green';

        // Crea un icono personalizado con el color seleccionado
        var icon = {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeOpacity: 1,
          strokeWeight: 1,
          scale: 5
        };
        const marker = new google.maps.Marker({
            position: { lat: lat, lng: lon},
            map: map,
            icon: icon
        });
        console.log("Marker mostrado Lat = "+ lat +" Lon = "+ lon);
        // Agregar evento de clic al marcador
        marker.addListener('click', function () {
        const infoWindow = new google.maps.InfoWindow({
            content: `<a href="${urlsCafeterias[i]}" target="_blank"><strong>${nombresCafeterias[i]}</strong></a>`
        });
        infoWindow.open(map, marker);
      });

    }
      
  }


/* Funciones para la página de un puerto */
function infoPort(ports) {
    const urlParams = new URLSearchParams(window.location.search);
    const portId = urlParams.get('portId');
    port = ports[portId];
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
    
    html = setStars(portRating);
   
      html += `<p>Numero de valoraciones: ` + portRatingCount + `</p>
            </div>
          </div>
        </div>
      `;

    portValoracioContenedor.innerHTML = html;

}

function addToFavorites() {
  const favoritePorts = JSON.parse(localStorage.getItem('favoritePorts')) || [];

  const puerto = { name: port.name, code: port.name }; // Define el puerto a agregar

  // Verificar si el puerto ya existe en la lista de favoritos
  const portExists = favoritePorts.some(favoritePort => favoritePort.code === puerto.code);

  if (!portExists) {
    favoritePorts.push(puerto);
    localStorage.setItem('favoritePorts', JSON.stringify(favoritePorts));
    alert(`El puerto ${puerto.name} ha sido añadido a favoritos`);
  } else {
    alert(`El puerto ${puerto.name} ya está en la lista de favoritos`);
  }
}

function removeFavoritePort() {
  // Obtener los puertos favoritos almacenados en localStorage
  const puerto = { name: port.name, code: port.name };
  const favoritePorts = JSON.parse(localStorage.getItem('favoritePorts'));

  // Verificar si hay puertos favoritos almacenados
  if (favoritePorts && favoritePorts.length > 0) {
    // Encontrar y eliminar el puerto de favoritos
    const updatedPorts = favoritePorts.filter(p => p.code !== puerto.code);

    // Actualizar los puertos favoritos en localStorage
    localStorage.setItem('favoritePorts', JSON.stringify(updatedPorts));

    // Mostrar mensaje de éxito o realizar alguna acción adicional si es necesario
    alert(`El puerto ${port.name} ha sido eliminado de favoritos.`);
  } else {
    alert('No hay puertos favoritos almacenados');
  }
}

function viewFavorites() {
  // Obtener los puertos favoritos almacenados en localStorage
  const favoritePorts = JSON.parse(localStorage.getItem('favoritePorts'));

  // Verificar si hay puertos favoritos almacenados
  if (favoritePorts && favoritePorts.length > 0) {
    // Obtener solo los nombres de los puertos favoritos
    const favoritePortNames = favoritePorts.map(port => port.name);

    // Mostrar los puertos favoritos en un cuadro de diálogo de alerta
    alert('Puertos favoritos:\n' + favoritePortNames.join('\n'));
  } else {
    alert('No hay puertos favoritos almacenados');
  }
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

      html += setStars(valoracion);

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
function setStars(valoracion){
  html='<div class="rating" id="rating">';
  count=valoracion;
  for(let i=0;i<valoracion; i++){
    if(count<=0.5){
      html += '<span class="fa fa-star-half checked"></span>';
    }else{
      html += ' <span class="fa fa-star checked"></span>'
    }
    count--;
  }
  html += `<p class="valoracionPuertoPrev">` + valoracion + `</p>
  </div>`
  
  return html;
}

function loadImgs(ports) {
  const urlParams = new URLSearchParams(window.location.search);
  const portId = urlParams.get('portId');
  const puerto = ports[portId];
  var images = puerto.image;
  var html1 = '<h2>Galería de Imágenes</h2><div id="carouselInit" class="carousel slide mt-0 w-100" data-bs-ride="carouselInit ">';
  var html2= '<div class="carousel-inner">';

  var items = 0;

  const contenidorGeneral = document.getElementById("galeria-img");

  html1+='<div class="carousel-indicators">';
  html1+='<button type="button" data-bs-target="#carouselInit" data-bs-slide-to="0" class="active" aria-current="true"';
  html1+='aria-label="Slide 1"></button>';

  html2+=`<div class="carousel-item active">
  <img src="`+images[0]+`" class="d-block w-70" alt="...">
</div>`
  
  items++;
  for (let i = 1; i < images.length; i++) {
    const img = new Image();
    img.src = images[i];

    //img.onload = function() {
      html1+='<button type="button" data-bs-target="#carouselInit" data-bs-slide-to="'+items+'" aria-label="Slide'+(i+2)+'"></button>';

      html2+=`<div class="carousel-item">
      <img src="`+images[i]+`" class="d-block w-50" alt="...">
  </div>`
      items++;
    //};

    //img.onerror = function() {

    //};
    
  }

  html1+='</div>';//tancam indicators

  html2+=`</div><button class="carousel-control-prev" type="button" data-bs-target="#carouselInit" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselInit" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button></div>`;//tancam inner content

contenidorGeneral.innerHTML = html1+html2;

}

