import './thumbnail-render.js';
import { openImageModal } from './full-image-open.js';
import { renderImage } from './thumbnail-render.js';
import { getData } from './api.js';
import './image-form.js';
import './image-scale.js';
import './image-effects.js';
import { openDataError } from './status-modals.js';

const onPictureClick = (photosData) => {
  openImageModal(photosData);
};

getData()
  .then((pictures) => renderImage(pictures, onPictureClick))
  .catch(() => {
    openDataError();
  });
