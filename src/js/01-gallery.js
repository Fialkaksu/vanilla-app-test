import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
let markup = '';

for (const { preview, original, description } of galleryItems) {
  markup += `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}

galleryEl.insertAdjacentHTML('afterbegin', markup);

// Initialize SimpleLightbox
let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

gallery.on('error.simplelightbox', function (e) {
  console.log(e);
});
