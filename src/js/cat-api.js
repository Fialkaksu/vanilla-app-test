import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_nOdnL3Dj9jjF4zVLjteozldoqmiVUxxCRsrlPoRVyonLQDm4DFuaUNiaRzafsnXC';

export async function fetchBreeds() {
  return axios.get(`https://api.thecatapi.com/v1/breeds`);
}

export async function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
