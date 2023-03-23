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


