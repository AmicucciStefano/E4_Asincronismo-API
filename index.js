const input = document.getElementById("number");
const button = document.querySelector(".btn");
const cardContainer = document.querySelector(".cards-container");
const errorMessage = document.querySelector(".errormessage");

const URL = "https://pokeapi.co/api/v2/pokemon/";


button.addEventListener("click", () => {
    let pokemon = Number(input.value);
    
    pokemon === 0 ? renderError("Please, write a number higher than 0"): errorMessage.innerHTML= "", getPokemons(pokemon); 
})

const getPokemons = async (id) => {
    try {
        const urlComplete = URL + id;
        const response = await fetch(urlComplete);
        response.ok === false ? renderError("No pokemon with this number, please write a lower number") : errorMessage.innerHTML = "";
        const data = await response.json();
        renderPokemon(data)

    } catch (error) {
        console.log(error);
    }
}

const renderPokemon = ( pokemon ) => {
    const picture = pokemon.sprites.front_default;
    const type = pokemon.types[0].type.name;
    let {name, height, weight} = pokemon;
    name = name.toUpperCase()
    cardContainer.innerHTML = `
    <div class="card ms-auto me-auto" style="width: 18rem;">
        <img src=${picture} class="card-img-top" alt=${name}>
        <div class="card">
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark bg-gradient text-white">${name}</li>
                <li class="list-group-item text-white ${type === "water" ? "bg-primary bg-gradient" : type === "fire" ? "bg-danger bg-gradient" : type === "grass" ? "bg-success bg-gradient" : type === "electric" ? "bg-warning bg-gradient" :  "bg-secondary bg-gradient"}"> Type: ${type}</li>
                <li class="list-group-item bg-dark bg-gradient text-white">height: ${height / 10}M</li>
                <li class="list-group-item bg-dark bg-gradient text-white">weight: ${weight / 10}KG</li>
            </ul>
        </div>
    </div>
    `
}

const renderError = (msg) => {
    errorMessage.innerHTML = `${msg}`
}
