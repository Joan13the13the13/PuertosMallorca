fetch('ports.json')
  .then(response => response.json())
    .then(data => {
        const ports = data.itemListElement; // Obtener todos los puertos del array
        
        const urlParams = new URLSearchParams(window.location.search);
        const portId = urlParams.get('portId');
        const port = ports[portId];

        const city = port.address.addressLocality;

        const apiKey = '7ee27410d43b852ca993e17f18a42e5a';
        const apiUrl =
            "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7ee27410d43b852ca993e17f18a42e5a&units=metric";
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        
        const temperature = data.main.temp;
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        document.getElementById("tempCity").innerHTML = `Meteorologia en 
            ${city}  `;
        document.getElementById("temperature").innerHTML = `
            ${temperature} ℃. `;
        document.getElementById("humidity").innerHTML = `
            ${humidity} %`;
        document.getElementById("windSpeed").innerHTML = `
            ${windSpeed} km/h`;
        })
    .catch(error => console.error(error));
        
    });



