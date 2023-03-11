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

// Función que lee las categorias de los eventos y crea un checkbox por cada categoria
function loadCategories() {
    let checkbox = document.getElementById('checkboxes-container');
    let templateCheckbox = '';

    // Se recorre el array de eventos y se guarda el nombre de las categorias sin repetir en el array vacio
    let categories = data.events.map(event => event.category);
    let setCategories = new Set(categories);
    let arrayCategories = [...setCategories];

    // Se recorre el array de categorias y se crea un checkbox por cada categoria
    arrayCategories.forEach((category, id) => {
        templateCheckbox += `   <div class="form-check form-check-inline"> 
                            <input class="form-check-input" type="checkbox" id="${id}" value="${category}">
                            <label class="form-check-label" for="${id}">${category}</label>
                        </div>
                    `;
        checkbox.innerHTML = templateCheckbox;
    })
}

// Función que lee la actividad de los checkbox
function loadCheckbox() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (box) => {
            if (box.target.checked) {
                checked.push(box.target.value);
            } else {
                checked = checked.filter(uncheck => uncheck != box.target.value);
            }
            checksAndSearch();
        });
    });
}

//función que lee el input de busqueda
function loadSearch() {
    let input = document.getElementById('search');
    input.addEventListener('keyup', (event) => {
        search = event.target.value;
        checksAndSearch();
    });
}

// Función que une las busquedas por checkbox y por input
function checksAndSearch() {
    let filteredEvents = [];

    if (checked.length > 0 && search !== "") {
        checked.map(category => {
            filteredEvents.push(...data.events.filter(event => event.name.toLowerCase().includes(search.trim().toLowerCase()) &&
                event.category == category))
        })

        console.log(filteredEvents)
    } else if (checked.length > 0 && search === "") {
        checked.map(category => {
            filteredEvents.push(...data.events.filter(event => event.category == category))
        })
    } else if (checked.length == 0 && search !== "") {
        filteredEvents.push(...data.events.filter(event => event.name.toLowerCase().includes(search.trim().toLowerCase())))
    } else {
        filteredEvents.push(...data.events);
    }
    createCards(filteredEvents);
    heightCards();
}

// Función que regula la altura de las cards para que todas tengan la misma altura
function heightCards() {
    let cards = document.querySelectorAll(".card");
    let maxHeight = 0;
    cards.forEach(card => {
        if (card.clientHeight > maxHeight) {
            maxHeight = card.clientHeight;
        }
    });
    cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
    });
}