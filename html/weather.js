const apiKey = '7ee27410d43b852ca993e17f18a42e5a';
const apiUrl =
`https://api.openweathermap.org/data/2.5/weather?q=Pa
lma+de+Mallorca&appid=${apiKey}&units=metric`;
fetch(apiUrl)
 .then(response => response.json())
 .then(data => {
console.log(data);

const temperature = data.main.temp;
const city = data.name;
const humidity = data.main.humidity;
const windSpeed = data.wind.speed;
const description = data.weather[0].description;

document.getElementById("tempCity").innerHTML = `Meteorologia en 
${city}  `;
document.getElementById("temperature").innerHTML = `
${temperature} grados Celsius. `;
document.getElementById("humidity").innerHTML = `
${humidity} %`;
document.getElementById("windSpeed").innerHTML = `
${windSpeed} km/h`;
 })
 .catch(error => console.error(error));