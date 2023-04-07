const pokemonList = document.querySelector("#pokemonList");
const pokemonInfo = document.querySelector("#pokemon-info");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const pokemonModal = document.querySelector('#pokemon-modal');
const closeButton = document.querySelector('.close');
const loader = document.querySelector('#preloader')

pokemonModal.style.display = 'none';

let links = {
  previous,
  next
};

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

function showPokemonList(pokemons) {
  pokemonList.innerHTML = "";
  for (const pokemon of pokemons) {
    const item = document.createElement("li");
    item.classList.add("pokemon");
    item.innerHTML = pokemon.name;
    item.addEventListener("click", () => showPokemonInfo(pokemon));
    pokemonList.appendChild(item);
  }
}

function showPokemonInfo(pokemon) {
  pokemonModal.style.display = 'flex';
  pokemonInfo.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img class ="pokemon-img" src="${pokemon.image}" alt="${pokemon.name} ">
    <p>Type: ${pokemon.type.join(", ")}</p>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
  `;
}

async function loadPokemonList(url) {
  loader.style.display = 'block';
  try {
    const result = await getPokemonList(url);
    showPokemonList(result.pokemons);
    previousButton.disabled = !result.previous;
    nextButton.disabled = !result.next;
    links.previous = result.previous;
    links.next = result.next
  } catch (error) {
    console.error(error);
    loader.style.display = 'none';
  }
  loader.style.display = 'none';
};

loadPokemonList(url);
previousButton.addEventListener("click", () => loadPokemonList(links.previous));
nextButton.addEventListener("click", () => loadPokemonList(links.next));
function handleCloseClick() {
  pokemonModal.style.display = 'none';
}
closeButton.addEventListener('click', handleCloseClick);