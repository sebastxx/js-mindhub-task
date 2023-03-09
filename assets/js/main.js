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

heightCards();

// Función que se ejecuta cada vez que se redimensiona la pantalla
// window.addEventListener('resize', () => {
//     heightCards();
// });