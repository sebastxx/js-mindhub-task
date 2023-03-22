const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

async function getData() {
    await fetch(urlApi)
        .then(response => response.json())
        .then(data => {
            arrayPast = past(data.events, data.currentDate);
            arrayUpcoming = futures(data.events, data.currentDate)
            printTable(results(attendance(arrayPast), attendance(arrayPast).reverse(), capacity(arrayPast)), "statistics")
            printSecondTable(dataTable(arrayUpcoming), "upcoming")
            printSecondTable(dataTable(arrayPast), "past")
        })
        .catch(error => console.log(error))
}

getData();

// función que filtra los eventos futuros
function futures(data, currentDate) {
    return data.filter(evento => evento.date > currentDate)
}

//funcion que filtra los eventos pasados
function past(data, currentDate) {
    return data.filter(event => event.date < currentDate)
}



//funcion que crea un array con los eventos pasados y ordena de mayor a menor por porcentaje de asistencia
function attendance(arrPast) {
    const arrayPercentage = arrPast.map(event => {
        return {
            attendance: (event.assistance / event.capacity) * 100,
            nameEvent: event.name
        }
    })
    arrayPercentage.sort((a, b) => b.attendance - a.attendance)

    return arrayPercentage
}

//funcion que crea un array con los eventos pasados y ordena de mayor a menor por capacidad
function capacity(arrPast) {
    const arrayCapacity = arrPast.map(event => {
        return {
            capacity: event.capacity,
            nameEvent: event.name
        }
    })
    arrayCapacity.sort((a, b) => b.capacity - a.capacity)

    return arrayCapacity

}

//funcion que crea un objeto con los resultados de las funciones anteriores
function results(highestPercentage, lowestPercentage, largerCapacity) {
    let all = {
        highestPercentage: highestPercentage[0].nameEvent,
        lowestPercentage: lowestPercentage[0].nameEvent,
        largerCapacity: largerCapacity[0].nameEvent,
    }
    return all
}

//funcion que imprime los resultados en la tabla
function printTable(results, container) {
    const table = document.getElementById(container)
    table.innerHTML = `
        <tr>
            <td>${results.highestPercentage}</td>
            <td>${results.lowestPercentage}</td>
            <td>${results.largerCapacity}</td>
        </tr>
        `
}


// funcion que crea un array con los eventos futuros y pasados
function dataTable(arr) {
    let categories = Array.from(new Set(arr.map(a => a.category)));
    let eventCategories = categories.map(cat => arr.filter(event => event.category == cat))
    let result = eventCategories.map(eventCat => {
        let calculate = eventCat.reduce((acc, event) => {
            acc.category = event.category;
            acc.revenues += event.price * (event.assistance || event.estimate);
            acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
            return acc
        }, {
            category: "",
            revenues: 0,
            attendance: 0
        })
        calculate.attendance = calculate.attendance / eventCat.length
        return calculate
    })
    return result;
}

//funcion que imprime los eventos futuros y pasados en la tabla
function printSecondTable(arr, idTag) {
    const upcomingTable = document.getElementById(idTag)
    let html = arr.map(events => {
        return `
            <tr>
                    <td>${events.category}</td>
                    <td>$${events.revenues}</td>
                    <td>${events.attendance.toFixed(2)}%</td>
                </tr>
            `
    })
    upcomingTable.innerHTML = html.join("")
}