fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        infoPort(ports); //Llamar a la función para mostrar la información de un puerto
    });

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
    const portVideo = port.subjectOf.video[0]; //Link del video del puerto
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

    //Video del Puerto
    let player;
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: portVideo,
        playerVars: {
            'playsinline': 1,
            'rel': 0,
            'autoplay': 0
        }
        });
}

    // Cargar la API de YouTube
    function cargarAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }


    cargarAPI();
