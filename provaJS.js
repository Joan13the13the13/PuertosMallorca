var obj = JSON.parse(jsonString); // per convertir json string a un objecte de javascript
var str = JSON.stringify(obj); // per convertir un objecte de javascipt a text de json

// Mètode per obtenir dades en format jason de una url
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const alumnos = request.response;
    visualizar(alumnos);
   }