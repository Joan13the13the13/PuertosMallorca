fetch('ports.json')
    .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        loadPorts(ports); // Llamar a la función updatePorts para actualizar los elementos del DOM
    });
    


function loadPorts(ports){
    const contenidorGeneral=document.getElementById("contenedorPrePuertos");
    var html='';
    var items=0;
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];//obtenim port
        const portName = port.name;
        const portCapacitat=port.additionalProperty.maxValue;
        const valoracion=port.aggregateRating.ratingValue;


        if(items%4==0){//si començam nova columna
            html+='<div class="row equal-width">';
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
    console.log("Hola")
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