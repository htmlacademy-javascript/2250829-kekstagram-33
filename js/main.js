import './thumbnail-render.js';
import { openImageModal } from './full-image-open.js';
import { renderImages } from './thumbnail-render.js';
import { getData } from './api.js';
import './image-form.js';
import './image-scale.js';
import './image-effects.js';
import { openDataError } from './status-modals.js';
import { imageFilters } from './images-filters.js';
import { sortImages } from './sort-images.js';

const onPictureClick = (photosData) => {
  openImageModal(photosData);
};

getData()
  .then((pictures) => {
    renderImages(pictures, onPictureClick);
    sortImages(pictures, onPictureClick);
    imageFilters.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    openDataError();
  });
