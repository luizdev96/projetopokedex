const pokemonList = document.getElementById('pokemonList');
const btnMore = document.getElementById('loadMore');

const limit = 11;
let offset = 0;
const maxRecords = 151;

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

function loadPokemonsItem( offset,limit ){
    pokeApi.getPokemons(offset,limit).then( (pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonsItem(offset, limit)

btnMore.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsNextPage = offset + limit

    if(qtdRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonsItem(offset, newLimit)

        btnMore.parentElement.removeChild(btnMore)
    }else{
        loadPokemonsItem(offset, limit)
    }
})
