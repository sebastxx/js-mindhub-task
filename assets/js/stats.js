const urlApi = './assets/api/amazing_1.json';
let checked = []; // Array para guardar los checkbox seleccionados
let search = ''; // Variable para guardar el valor del input de busqueda

// Funcion asincrona que obtiene los datos de la API
async function getData() {
    await fetch(urlApi)
        .then(response => response.json())
        .then(urlApi => {
            data = urlApi;
            loadCategories();
            loadCheckbox();
            checksAndSearch();
            loadSearch();
            heightCards();
        })
        .catch(error => console.log(error))
}

getData();