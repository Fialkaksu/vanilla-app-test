import axios from 'axios';
import { controls, keys, BASE_URL } from './img-constants';

axios.defaults.headers.common['x-api-key'] = keys.AXIOS_KEY;
axios.defaults.headers = ['Access-Control-Allow-Origin'];

export async function fetchHits() {
  const queryParams = new URLSearchParams({
    key: keys.API_KEY,
    q: controls.searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: controls.per_page,
    page: controls.page,
  });

  const response = await axios.get(`${BASE_URL}?${queryParams}`);

  const data = await response.data;
  return data;
}
