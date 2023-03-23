const pokemonList = document.querySelector("#pokemonList");
const pokemonInfo = document.querySelector("#pokemon-info");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const pokemonModal = document.querySelector('#pokemon-modal');
const closeButton = document.querySelector('.close');
const loader = document.querySelector('#preloader')

pokemonModal.style.display = 'none';

let url = "https://pokeapi.co/api/v2/pokemon/";

const request = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    loader.style.display = 'none'
    throw Error('request error:' + response.status);
  }
  return await response.json();
};


async function getPokemonList(url) {
  const data = await request(url);
  const results = data.results;
  const pokemons = [];
  for (const result of results) {
    const data = await request(result.url);
    const pokemon = {
      name: data.name,
      image: data.sprites.front_default,
      type: data.types.map(type => type.type.name),
      height: data.height,
      weight: data.weight
    };
    pokemons.push(pokemon);
  }
  return {
    pokemons: pokemons,
    previous: data.previous,
    next: data.next
  };
}

