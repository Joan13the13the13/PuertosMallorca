fetch('ports.json')
  .then(response => response.json())
  .then(data => {
    const ports = data.itemListElement; // Obtener todos los puertos del array
    
    // Mostrar la información de cada puerto en el HTML
    for (let i = 0; i < ports.length; i++) {
      const port = ports[i];
      const portName = port.name;
      const portDesc = port.description;
      
      const portNameElement = document.querySelector(`#port-name${i}`);
      portNameElement.textContent = portName;
      
      const portDescriptionElement = document.querySelector(`#port-description${i}`);
      portDescriptionElement.textContent = portDesc;
    }

    /*
    const port1 = data.itemListElement[1]; // Obtener el primer puerto del array
    const portName1 = port1.name;
    const portDesc1 = port1.description;
    //const portLocation = port.location;
    
    // Mostrar la información del puerto en el HTML
    const portNameElement1 = document.querySelector('#port-name1');
    portNameElement1.textContent1 = portName1;
    
    const portDescriptionElement1 = document.querySelector('#port-description1');
    portDescriptionElement1.textContent1 = portDesc1;
    
    //const portAdressElement = document.querySelector('#port-adress');
    //portDescriptionElement.textContent = portDesc;

    //const portLocationElement = document.querySelector('#port-location');
    //portLocationElement.textContent = portLocation;
    */
  });




