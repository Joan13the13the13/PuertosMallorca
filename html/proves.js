//Funcion que le el JSON de nuestros datos
async function fetchJSON() {
    const response = await fetch('ports.json');
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const data = response.json();
    return data;
}

fetchJSON().catch(error => {
    error.message; // 'An error has occurred: 404'
});

//Funció per a obtenir informació d'un port
function getPort(){

}