const pokemonList = document.getElementById('pokemonList');

function convertPokemonsTypes (pokemonTypes){
    return pokemonTypes.map( (typeSlot) => { return `<li class="type">${typeSlot.type.name}</li>`})
}
function convertPokemonToHtml(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detaill">
            <ol class="types">
                ${pokemon.types.map( (type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
        </div>
    </li>
    `
}

pokeApi.getPokemons().then( (pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('');
})

