const pokeApi = {}

function convertPokeApiToPokemonDetails(pokeDetails){
    const pokemon = new Pokemon()

    pokemon.id = pokeDetails.order
    pokemon.name = pokeDetails.name
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon;
   
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then( convertPokeApiToPokemonDetails)
}

pokeApi.getPokemons = (offset = 0, limit = 4) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then( (response) => response.json() )
        .then( (jsonBoody) => jsonBoody.results )
        .then( (pokemons) => pokemons.map( pokeApi.getPokemonDetails) )
        .then( (detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch( (error) => console.log(error))
}   