import SlimSelect from "slim-select";
import Notiflix from "notiflix";
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";

const refs = {
    body: document.querySelector('body'),
    selectContainer: document.querySelector('.select-container'),
    select: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.container-loader')
};

fetchBreeds().then((breeds) => {
    addValueToSelect(breeds);
    refs.selectContainer.classList.remove('is-hidden');
    refs.loader.classList.add('is-hidden')
}).catch(onFetchErorr);

function addValueToSelect(breeds) {
    

    const markup = breeds.map(({ id, name }) => {
        return `<option value='${id}'>${name}</option>`
    }).join('');

    refs.select.insertAdjacentHTML('beforeend', markup);

    new SlimSelect({
        select: document.querySelector('.breed-select'),
    });
}

function renderCatByBread(event) {
    clearCardOfCat()
    const breedId = event.target.value;
    fetchCatByBreed(breedId).then((data) => {
        refs.loader.classList.remove('is-hidden')
        makeCardOfCat(data)
        refs.loader.classList.add('is-hidden')

    }).catch(onFetchErorr);
}

function onFetchErorr(error) {
    console.log(error);
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    refs.loader.classList.add('is-hidden');
}

function makeCardOfCat(data) {

    const cat = data[0];

    const { url, breeds: [{ name, description, temperament }] } = cat;

    const markupCat = `<div>
                        <img src="${url}" alt="${name}" width="750" height="550">
                        <h1>${name}</h1>
                        <p>${description}</p>
                        <p>Temperament: ${temperament}</p>
                    </div>`;
    
    refs.divCatInfo.insertAdjacentHTML('beforeend', markupCat);
}

function clearCardOfCat() {
    refs.divCatInfo.innerHTML = ''
}

const breedId = refs.select.addEventListener('change', renderCatByBread);
