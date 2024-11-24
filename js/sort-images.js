import { changeFilter, imageFiltersButtons } from './images-filters.js';
import { renderImages } from './thumbnail-render.js';
import { sortArrayRandom, debounce } from './util.js';

const SORT_IMAGES_DELAY = 500;
const RANDOM_IMAGES_COUNT = 10;

const sortArrayByComments = (a, b) => b.comments.length - a.comments.length;

const renderImagesByFilter = (filterType, pictures, onPictureClick) => {
  let sortingPictures = pictures;
  switch (filterType) {
    case 'filter-random':
      sortingPictures = sortArrayRandom(pictures.slice()).slice(0, RANDOM_IMAGES_COUNT);
      break;
    case 'filter-discussed':
      sortingPictures = pictures.slice().sort(sortArrayByComments);
      break;
    default:
      sortingPictures = pictures;
      break;
  }
  renderImages(sortingPictures, onPictureClick);
};

const sortImages = (pictures, onPictureClick) => {
  imageFiltersButtons.forEach((filterButton) => {
    const renderImagesByFilterWithTimeOut = debounce(renderImagesByFilter, SORT_IMAGES_DELAY);
    filterButton.addEventListener('click', () => {
      const filterType = changeFilter(filterButton);
      renderImagesByFilterWithTimeOut(filterType, pictures, onPictureClick);
    });
  });
};

export { sortImages };
