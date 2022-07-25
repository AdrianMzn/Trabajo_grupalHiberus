let pokemons = new Array();

let getPokemonInfo = async(url) => {
    try{
        let respuesta = await fetch(url);
        let datos = await respuesta.json();
        pokemons.push(datos);
    } catch{
        console.log(error);
    }
}

let url = "https://pokeapi.co/api/v2/pokemon";
let getPokemons = async(url) => {
    try{
        pokemons = [];
        let respuesta = await fetch(url);
        let datos = await respuesta.json();
        let lista = datos.results;

        for (let pokemon of lista) {
            await getPokemonInfo(pokemon.url)
        }
        
    } catch{
        console.log(error);
    }
}

let selectPokemons = async() => {
    await getPokemons(url)
    pokemons.forEach((poke) => {
        document.querySelector('#pokemon').innerHTML += `<option value=${poke.name}>${poke.name}</option>`;
        // document.querySelector('#formularioTarjeta').innerHTML += `<div id="tarjetas"><p>${poke.name}</p><img src="${poke.sprites.front_shiny}" alt=""></div>`
    })
}



let pintarPokemons = async() =>{
    debugger
    await getPokemons(url)

    var nombreBuscado = document.getElementById("pokemon").value;
    // var tipoBuscado = document.getElementById("tipoPokemon").value;
    var nuevoVector = pokemons.filter(item => item.name.includes(nombreBuscado));
    nuevoVector.forEach((poke) => {
        document.querySelector('#formularioTarjeta').innerHTML += `<div id="tarjetas"><p>${poke.name}</p><img src="${poke.sprites.front_shiny}" alt=""></div>`
    })
}

document.querySelector('#pokemon').onchange = pintarPokemons;