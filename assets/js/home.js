// Funcion que crea y muestra las cards de los eventos
function createCards(eventsList) {
    let templateCard = "";
    let card = document.getElementById("event-cards");
    if (eventsList.length != 0) {
        eventsList.forEach(function (event) {
            templateCard += `<div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card text-center">
                        <img src="${event.image}" class="card-img-top" alt="...">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${event.name}</h5>
                            <h6>Date: ${event.date}</h6>
                            <p class="card-text flex-grow-1">${event.description}</p>
                            <div class="row mt-auto">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <p>Price: $ ${event.price}</p>
                                </div>
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <a href="./details.html?id=${event._id}" class="btn btn-primary">View more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        card.innerHTML = templateCard;
    } else {
        card.innerHTML = `<h3>There are no events that match your search. Try again.</h3>`;
    }
}