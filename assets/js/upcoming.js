
const container = document.querySelector('#event-cards');

let cards = '';

// Se muestran sólo las cards con eventos futuros
for (const event of data.events) {
    if (event.date > data.currentDate) {
    cards += `  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card text-center">
                        <img src="${event.image}" class="card-img-top" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text flex-grow-1">${event.description}</p>
                            <div class="row mt-auto">
                                <div class="col-sm-6 mb-3 mb-sm-0">Price: $ ${event.price}</div>
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <a href="#" class="btn btn-primary">View more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    }
}

container.innerHTML = cards;

// Regular altura de cards para que todas se vean iguales:

// Se seleccionan todas las cards con un QuerySelectorAll
const cardsHeight = document.querySelectorAll('.card');

// Se setea la altura maxima en 0
let maxHeight = 0;

//Se recorren todas las cards con un forEach y se determina la altura más alta
cardsHeight.forEach(card => {
    if (card.clientHeight > maxHeight) {
    maxHeight = card.clientHeight;
    }
});

// Se establece la misma altura en todas las cards
cardsHeight.forEach(card => {
    card.style.height = `${maxHeight}px`;
});