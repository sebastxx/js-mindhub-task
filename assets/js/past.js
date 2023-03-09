let checked = []; // Array para guardar los checkbox seleccionados
let search = ''; // Variable para guardar el valor del input de busqueda

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

loadCategories();

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

loadCheckbox();

//función que lee el input de busqueda
function loadSearch() {
    let input = document.getElementById('search');
    input.addEventListener('keyup', (event) => {
        search = event.target.value;
        checksAndSearch();
    });
}

loadSearch();

// Función que une las busquedas por checkbox y por input
function checksAndSearch() {
    let filteredEvents = [];

    if (checked.length > 0 && search !== "") {
        checked.map(cat => {
            filteredEvents.push(...data.events.filter(event => event.name.toLowerCase().includes(search.trim().toLowerCase()) &&
                event.category == cat))
        })

        console.log(filteredEvents)
    } else if (checked.length > 0 && search === "") {
        checked.map(cat => {
            filteredEvents.push(...data.events.filter(event => event.category == cat))
        })
    } else if (checked.length == 0 && search !== "") {
        filteredEvents.push(...data.events.filter(event => event.name.toLowerCase().includes(search.trim().toLowerCase())))
    } else {
        filteredEvents.push(...data.events);
    }
    createCards(filteredEvents);
}

checksAndSearch();

// Funcion que crea y muestra las cards de los eventos pasados
function createCards(eventsList){
    let templateCard = ""
    let card = document.getElementById("event-cards");
    let date = data.currentDate;
    
    if(eventsList.length != 0){
        for (let i = 0; i < eventsList.length; i++) {
            if(date > eventsList[i].date){
                templateCard += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                    <div class="card text-center">
                                        <img src="${eventsList[i].image}" class="card-img-top" alt="...">
                                        <div class="card-body d-flex flex-column">
                                            <h5 class="card-title">${eventsList[i].name}</h5>
                                            <h6>Date: ${eventsList[i].date}</h6>
                                            <p class="card-text flex-grow-1">${eventsList[i].description}</p>
                                            <div class="row mt-auto">
                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                    <p>Price: $ ${eventsList[i].price}</p>
                                                </div>
                                                <div class="col-sm-6 mb-3 mb-sm-0">
                                                    <a href="./details.html?id=${eventsList[i]._id}" class="btn btn-primary">View more</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
            }
        }card.innerHTML = templateCard;
    } else {
        card.innerHTML = `<h3>There are no matches. Try again.</h3>`;
    }
    heightCards();
}

// Función que regula la altura de las cards para que todas tengan la misma altura
// el inconveniente es que el usuario tiene que recargar la página para reinicializar la altura de las cards
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