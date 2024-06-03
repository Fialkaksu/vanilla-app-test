import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

axios.defaults.headers.common['x-api-key'] =
  'live_nOdnL3Dj9jjF4zVLjteozldoqmiVUxxCRsrlPoRVyonLQDm4DFuaUNiaRzafsnXC';

const selectors = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};
const options = {
  position: 'topRight',
  close: false,
  timeout: 5000,
};
const Alert_Type = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};
const controls = {
  page: 1,
  per_page: 40,
  totalHits: 0,
  receivedHits: 0,
  totalPages: 0,
  searchQuery: null,
  isLoading: false,
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

gallery.on('error.simplelightbox', function (e) {
  console.log(e);
});

selectors.form.addEventListener('submit', onFormSubmit);
window.addEventListener('scroll', onScroll);

async function onFormSubmit(e) {
  e.preventDefault();

  if (controls.isLoading) return;
  controls.isLoading = true;

  const formData = new FormData(e.currentTarget);
  controls.searchQuery = formData.get('searchQuery');
  controls.page = 1;
  controls.receivedHits = 0;
  controls.totalHits = 0;
  controls.totalPages = 0;

  selectors.gallery.innerHTML = '';
  selectors.loader.classList.remove('hide');
  selectors.form.reset();

  if (!controls.searchQuery) {
    showAlert({ type: Alert_Type.ERROR });
    selectors.loader.classList.add('hide');
    return;
  }

  try {
    const data = await fetchHits(controls.searchQuery);
    if (!data?.hits?.length) {
      showAlert({ type: Alert_Type.ERROR });
      return;
    }

    renderImages(data.hits);
    controls.page++;
    controls.totalHits = data.totalHits;
    controls.totalPages = Math.ceil(controls.totalHits / controls.per_page);
    controls.receivedHits += data.hits.length;
    controls.per_page = Math.min(
      controls.totalHits - controls.receivedHits,
      controls.per_page
    );

    gallery.refresh();

    showAlert({ type: Alert_Type.SUCCESS, totalHits: controls.totalHits });

    if (controls.page < controls.totalPages) {
      window.addEventListener('scroll', onScroll);
    }
  } catch (error) {
    console.log(error);
    showAlert({ type: Alert_Type.ERROR });
  } finally {
    selectors.loader.classList.add('hide');
    controls.isLoading = false;
  }
}

function onScroll() {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 50
  ) {
    selectors.loader.classList.remove('hide');
    loadMore();
  }
}

async function loadMore() {
  if (controls.isLoading) return;
  controls.isLoading = true;

  try {
    const data = await fetchHits(controls.searchQuery);
    renderImages(data.hits);
    controls.page++;
    controls.receivedHits += data.hits.length;
    controls.per_page = Math.min(
      controls.totalHits - controls.receivedHits,
      controls.per_page
    );

    gallery.refresh();

    const { height: cardHeight } =
      selectors.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (controls.page > controls.totalPages) {
      window.removeEventListener('scroll', onScroll);
      showAlert({ type: Alert_Type.INFO });
    }
  } catch (error) {
    console.log(error);
    showAlert({ type: Alert_Type.ERROR });
  } finally {
    selectors.loader.classList.add('hide');
    controls.isLoading = false;
  }
}

async function fetchHits(searchQuery) {
  const queryParams = new URLSearchParams({
    key: '44202133-14fac6110a8eccaaec992feaf',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: controls.per_page,
    page: controls.page,
  });

  const response = await fetch(
    `https://pixabay.com/api/?${queryParams.toString()}`
  );

  const data = await response.json();
  console.log(data);
  return data;
}

function renderImages(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
          <a href="${largeImageURL}" class="card-link">
            <img src="${webformatURL}" alt="${tags}" class="card-image" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div>
      `;
      }
    )
    .join('');

  selectors.gallery.insertAdjacentHTML('beforeend', markup);
}

function showAlert({ type, totalHits }) {
  if (totalHits && type === Alert_Type.SUCCESS) {
    iziToast.success({
      message: `Hooray! We found ${totalHits} images.`,
      ...options,
    });
  } else if (type === Alert_Type.ERROR) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      ...options,
    });
  } else if (type === Alert_Type.INFO) {
    iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      ...options,
    });
  }
}
