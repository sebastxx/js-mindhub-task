
const container = document.querySelector('#event-cards');

let cards = '';

//eventospasados
for (const event of data.events) {
    if (event.date < data.currentDate) {
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
}

container.innerHTML = cards;