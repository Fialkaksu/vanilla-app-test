import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectors = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  catInfo: document.querySelector('.cat-info'),
};

selectors.breedSelect.addEventListener('change', onBreedSelectChange);

(function addOptions() {
  fetchBreeds()
    .then(response => response.data)
    .then(breeds => {
      renderOptions(breeds);
      new Choices(selectors.breedSelect, {
        searchEnabled: true,
      });
    })
    .catch(err => {
      console.log(err);
      showError();
    })
    .finally(() => {
      selectors.loader.classList.add('hide');
      selectors.breedSelect.classList.remove('hide');
    });
})();

function onBreedSelectChange() {
  selectors.loader.classList.remove('hide');
  selectors.catInfo.innerHTML = '';

  const breedId = selectors.breedSelect.value;

  fetchCatByBreed(breedId)
    .then(response => response.data)
    .then(data => {
      renderCatInfo(data[0]);
    })
    .catch(err => {
      console.log(err);
      showError();
    })
    .finally(() => {
      selectors.loader.classList.add('hide');
    });
}

function renderOptions(breeds) {
  const markup = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  selectors.breedSelect.insertAdjacentHTML('beforeend', markup);
}

function renderCatInfo(cat) {
  const { url, breeds } = cat;
  const { name, description, temperament } = breeds[0];
  const markup = `
    <div class="cat-img">
      <img src="${url}" alt="${name}">
    </div>
    <div class="info">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
    </div>
  `;
  selectors.catInfo.innerHTML = markup;
}

function showError() {
  iziToast.error({
    message: `Oops! Something went wrong! Try reloading the page!`,
    position: 'topRight',
    close: false,
    timeout: 3000,
  });
}
