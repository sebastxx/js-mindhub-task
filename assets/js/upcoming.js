// Funcion que crea y muestra las cards de los eventos pasados
function createCards(eventsList) {
    let templateCard = ""
    let card = document.getElementById("event-cards");
    let date = data.currentDate;

    if (eventsList.length != 0) {
        for (let i = 0; i < eventsList.length; i++) {
            if (date < eventsList[i].date) {
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
        } card.innerHTML = templateCard;
    } else {
        card.innerHTML = `<h3>There are no matches. Try again.</h3>`;
    }
    heightCards();
}