let ports = [];

fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        ports = data.itemListElement; // Obtener todos los puertos del array
        updatePorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM
    });

function updatePorts(ports) {
    const contenidorGeneral = document.getElementById("contenedorPrePuertos");
    var html = '';
    var items = 0;
    let coordenadasLat = new Array(ports.length); //Coordenadas de latitud
    let coordenadasLon = new Array(ports.length); //Coordenadas de longitud
    let capacidades = new Array(ports.length); //Capacidades de los puertos
    let nombres = new Array(ports.length); //Array de nombres de los puertos
    // Mostrar la información de cada puerto en el HTML
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        const portName = port.name;
        const portGeo = port.geo;
        const portCapacitat = port.additionalProperty && port.additionalProperty.maxValue;
        const portImage = port.image[1];
        const valoracion = port.aggregateRating.ratingValue;
        //Localitació
        coordenadasLat[i] = portGeo.latitude;
        console.log(coordenadasLat[i]);
        coordenadasLon[i] = portGeo.longitude;
        console.log(coordenadasLon[i]);
        //Capacitat
        capacidades[i] = portCapacitat;
        //Nom
        nombres[i] = portName;
        const portId=trobarIndex(portName);
        if (items % 4 == 0) {
          html += '<div class="row equal-width">';
        }
        html += `
          <div class="col-md-3">
            <div class="card">
              <a href="puerto.html?portId=${portId}"><img class="card-img-top" src="` + portImage + `" alt="Card image cap"></a>
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
    contenidorGeneral.innerHTML = html;
    initMap(coordenadasLat, coordenadasLon, capacidades, nombres);
}

function trobarIndex(nom){

  for (let i = 0; i < ports.length; i++) {
    const port=ports[i];

    if(port.name==nom){
      return i;
    }
  }

  return -1;
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
            </div>`;
  return html;
}


function initMap(latit, longi, capa, nomb) {
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
            content: `<a href="puerto.html?portId=${i}"><strong>${nomb[i]}</strong></a><br>Capacidad: ${capa[i]}`
        });
        infoWindow.open(map, marker);
    });

    }
}

function sortPortsByName(ports2){
  return ports2.sort(function(a,b){
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

function PortSearch(){
  const nom=document.getElementById("form-name").value;
  const capacity=document.getElementById("filtro-capacidad-max").value;
  
  const ratingComponent=document.getElementById("filtro-valoracion");
  const ratingValue=ratingComponent.options[ratingComponent.selectedIndex].value;
  
  const sortByComponent=document.getElementById("filtro-ordenar");
  const sortByValue=sortByComponent.options[sortByComponent.selectedIndex].value;

  const sortByFavourites=document.getElementById("filtro-favoritos");
  const Favourites=sortByFavourites.options[sortByFavourites.selectedIndex].value;

  var html="";

  //si tots 3 estàn indefinits
    //crea alerta i surt
  if(nom == "" && capacity =="" && ratingValue=="Seleccionar..." && sortByValue == "Seleccionar..." && Favourites == "Seleccionar..."){
    alert("Tienes que rellenar al menos uno de los campos del formulario!");
    return;
  }

  var filteredPorts = ports.filter(function (port) {
    // Check if the 'name' attribute is provided and match the search criteria
    var nameMatch = !nom || nom === "" || port.name.toLowerCase().includes(nom.toLowerCase());
  
    // Check if the 'capacity' attribute is provided and doesn't exceed the specified value
    var capacityMatch =
      !capacity || capacity === "" || port.additionalProperty.maxValue <= capacity;
  
    // Check if the 'ratingValue' attribute is provided and matches the specified value
    var ratingMatch =
    ratingValue === "Seleccionar..." || (port.aggregateRating.ratingValue >= ratingValue && port.aggregateRating.ratingValue <= (ratingValue+1));
  
    const favoritePorts = JSON.parse(localStorage.getItem('favoritePorts')) || [];
    var favMatch = 
    Favourites ==="Todos" || favoritePorts.some(function (favoritePort) {
      return favoritePort.name === port.name;
    });

    // Return true only if all conditions are met
    return nameMatch && capacityMatch && ratingMatch && favMatch;
  });

  var sorted=filteredPorts;

  if(sortByValue == "nombre"){
    sorted=sortPortsByName(filteredPorts);

  }else if(sortByValue == "capacidad"){

    sorted =filteredPorts.sort(function (a, b) {
      return a.additionalProperty.maxValue - b.additionalProperty.maxValue;
    });

  }else if(sortByValue == "valoracion"){

    sorted =filteredPorts.sort(function (a, b) {
      return b.aggregateRating.ratingValue - a.aggregateRating.ratingValue;
    });

  }


  updatePorts(sorted);
}




