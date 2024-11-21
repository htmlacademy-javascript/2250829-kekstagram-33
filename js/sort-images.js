import { changeFilter, imageFiltersButtons } from './images-filters.js';
import { renderImage } from './thumbnail-render.js';
import { sortArrayRandom, debounce } from './util.js';

const SORT_IMAGES_DELAY = 500;
const RANDOM_IMAGES_COUNT = 10;

const sortArrayByComments = (a, b) => b.comments.length - a.comments.length;

const sortImages = (pictures, onPictureClick) => {
  const sortImagesCallback = (filterType) => {
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
    renderImage(sortingPictures, onPictureClick);
  };
  imageFiltersButtons.forEach((filterButton) => {
    const sortImagesWithTimeOut = debounce(sortImagesCallback, SORT_IMAGES_DELAY);
    filterButton.addEventListener('click', () => {
      const filterType = changeFilter(filterButton);
      sortImagesWithTimeOut(filterType);
    });
  });
};

export { sortImages };
