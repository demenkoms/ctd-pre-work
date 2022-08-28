let url ="https://swapi.dev/api/"

function fetchData(parameter) {
    fetch(`https://swapi.dev/api/${parameter}`)
    .then(data => {
        return data.json();
        })
    .then(data => { showPeople(data)
        });
}

function hideDiv() {
    document.getElementById("main").innerHTML = ""
}

function handleStart() {
    document.getElementById("start").style.display = "none"
    getPeople()
}

function getPeople() {
    let data = fetchData(`people/`)
    showPeople(data)
}

function showPeople(data) {
    let data_arr = data.results
    let personCard = ``
    for (let i = 0; i < data_arr.length; i++) {
        personCard += `<button class="button personCard" onclick="handlePerson(this.id)" id="${i+1}">${data_arr[i].name}</button>`    
    }
    document.getElementById("main").innerHTML = personCard
}

async function getPerson(id) {
    await fetch(`https://swapi.dev/api/people/${id}/`)
    .then(data => {
        return data.json();
        })
    .then(data => { showPerson(data)
        });
}

async function getPlanetName(url) {
    await fetch(url)
    .then(data => {
        return data.json();
        })
    .then(data => {document.getElementById("homeworld").innerHTML = data.name});
}


async function handlePerson(id) {
document.getElementById("start").style.display = "none"
    getPerson(id)
}


async function showPerson(data) {
    getPlanetName(data.homeworld)
    getFilmsName(data.films)
    let personCard = `<div class="person">
    <h2>${data.name}</h2>
    <h3>About</h3>
    <table>
        <colgroup>
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 50%;">
        </colgroup>
        <tbody>
            <tr>
                <td>Height</td>
                <td>${data.height}</td>
            </tr>
            <tr>
                <td>Mass</td>
                <td>${data.mass}</td>
            </tr>
            <tr>
                <td>Hair color</td>
                <td>${data.hair_color}</td>
            </tr>
            <tr>
                <td>Eye color</td>
                <td>${data.eye_color}</td>
            </tr>
            <tr>
                <td>Skin color</td>
                <td>${data.skin_color}</td>
            </tr>
            <tr>
                <td>Birth year</td>
                <td>${data.birth_year}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>${data.gender}</td>
            </tr>
            <tr>
                <td>Home world</td>
                <td id="homeworld"></td>
            </tr>
        </tbody>
    </table>
    <h3>Films</h3>
            <table id="films-list"></table>
</div>`

    document.getElementById("main").innerHTML = personCard
}

async function getFilmsName(film_url) {
    let filmRow = ''
    for (let i = 0; i < film_url.length; i++) {
        await fetch(film_url[i])
    .then(data => {
        return data.json();
        })
    .then(data => {filmRow += `<tr><td>${data.title}</td></tr>`
document.getElementById("films-list").innerHTML = filmRow
});
    }
}
