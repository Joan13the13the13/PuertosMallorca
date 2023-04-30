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
    
    //const portHoraES = port.openingHours[0]; //Horario de apertura entre semana
    //const portHoraFS = port.openingHours[1]; //Horario de apertura en fin de semana
    //const portAdressStr = port.adress.streetAddress; //Calle
    //const portAdressLoc = port.adress.addressLocality; //Localidad
    //const portAdressCod = port.adress.postalCode; //Codigo postal
    //const portSmoke = port.smokingAllowed; //Se puede fumar?
    //const portRating = port.aggregateRating.ratingValue; //Valoración media
    //const portRatingCount = port.aggregateRating.reviewCount; //Numero de valoraciones
    //const portCapacity = port.additionalProperty.maxValue; //Capacidad del puerto
    const portTelephone= port.telephone; //Telefono del puerto
    const portCorreo = port.keywords.termCode; //Correo del puerto
    //const portWP = port.keywords.additionalType; //Pagina Web del puerto
    //const portFax = port.faxNumber; //Pagina Web del puerto
    //const portImages = port.image; //Array de imagenes del puerto
    //const portVideo = port.subjectOf.video[0]; //Link del video del puerto
    
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
  }