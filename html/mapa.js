// Crear una instancia del mapa
var mymap = L.map('mapid').setView([39.6, 2.9], 10);

// Agregar un mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Agregar marcadores para los puertos
var markers = [	{		"name": "Puerto de Palma",		"location": [39.5571919, 2.6344251],
		"description": "Este puerto es uno de los más grandes de la isla y se encuentra en la ciudad de Palma de Mallorca. Es el principal puerto de llegada de cruceros y también es utilizado por los barcos de pesca y las embarcaciones de recreo."
	},
	{
		"name": "Puerto de Alcúdia",
		"location": [39.8464279, 3.1245584],
		"description": "Ubicado en la bahía de Alcúdia, este puerto es popular entre los navegantes debido a su proximidad a la Reserva Natural de la Albufera y las playas de arena blanca de la zona."
	},
	{
		"name": "Puerto de Sóller",
		"location": [39.7984339, 2.6986139],
		"description": "Este puerto se encuentra en el pintoresco pueblo de Sóller, en la costa noroeste de Mallorca. Es conocido por su hermoso paseo marítimo y sus restaurantes y tiendas locales."
	},
	{
		"name": "Puerto de Andratx",
		"location": [39.5500995, 2.3898558],
		"description": "Situado en la costa suroeste de la isla, el puerto de Andratx es un puerto deportivo y turístico popular con excelentes instalaciones para yates y barcos. La zona que rodea el puerto es también conocida por su paisaje natural y las playas cercanas."
	}
];

// Agregar los marcadores al mapa
for (var i = 0; i < markers.length; i++) {
	var marker = L.marker(markers[i].location).addTo(mymap);
	marker.bindPopup("<h3>" + markers[i].name + "</h3>" + markers[i].description);
}
