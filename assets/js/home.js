
const container = document.querySelector('#event-cards');

let cards = '';

//todos los eventos

for (const event of data.events) {
    cards += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card text-center">
                        <img src="${event.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${event.name}</h5>
                            <p class="card-text">${event.description}</p>
                            <div class="row">
                                <p class="col-sm-6 mb-3 mb-sm-0">Price: $ ${event.price}</p>
                                <a href="#" class="btn btn-primary col-sm-6 mb-3 mb-sm-0">View more</a>
                            </div>
                        </div>
                    </div>
                </div>`
}

container.innerHTML = cards;

// // Seleccionar todas las cards
// const cardsHeight = document.querySelectorAll('.card');

// // Inicializar la altura más alta en 0
// let maxHeight = 0;

// // Recorrer todas las cards y determinar la altura más alta
// cardsHeight.forEach(card => {
//   if (card.clientHeight > maxHeight) {
//     maxHeight = card.clientHeight;
//   }
// });

// // Establecer la misma altura en todas las cards
// cardsHeight.forEach(card => {
//   card.style.height = `${maxHeight}px`;
// });
