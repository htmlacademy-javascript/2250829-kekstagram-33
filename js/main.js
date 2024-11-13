import './thumbnail-render.js';
import { openImageModal } from './full-image-open.js';
import { renderImage } from './thumbnail-render.js';
import { similarImages } from './data.js';
import './image-form.js';
import './image-scale.js';
import './image-effects.js';

const pictureClickHandler = (photosData) => {
  openImageModal(photosData);
};
renderImage(similarImages, pictureClickHandler);
