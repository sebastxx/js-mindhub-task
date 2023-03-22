const urlApi = './assets/api/amazing_1.json';

// Funcion asincrona que obtiene los datos de la API
async function getData() {
    await fetch(urlApi)
        .then(response => response.json())
        .then(urlApi => {
            data = urlApi;
            details();
        })
        .catch(error => console.log(error))
}

getData();

function details() {
    const queryString = location.search;
    
    const urlParams = new URLSearchParams(queryString);

    const id = urlParams.get('id');

    console.log(id);

    const event = data.events.find(event => event._id == id);

    const details = document.querySelector("#container");

    details.innerHTML =  `<div class="row no-gutters">
                            <div class="col-md-6">
                                <img src="${event.image}" class="card-img" alt="${event.name}">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h2 class="card-title">${event.name} - $ ${event.price}</h2>
                                    <p class="card-text">${event.description}</p>
                                    <h6 class="card-text">• Date: ${event.date}</h6>
                                    <h6 class="card-text">• Category: ${event.category}</h6>
                                    <h6 class="card-text">• Location: ${event.place}</h6>
                                    <h6 class="card-text">• Capacity: ${event.capacity} people</h6>
                                    <br>
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <a href="javascript:history.back()" class="btn btn-primary">Go back</a>
                                    </div>
                                </div>
                            </div>
                        </div>`
}