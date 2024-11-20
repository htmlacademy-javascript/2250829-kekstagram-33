import { changeFilter, imageFiltersButtons } from './images-filters.js';
import { renderImage } from './thumbnail-render.js';
import { sortArrayRandom, debounce } from './util.js';

const sortArrayByComments = (a, b) => b.comments.length - a.comments.length;
const SORT_IMAGES_DELAY = 500;

const sortImages = (pictures, onPictureClick) => {
  imageFiltersButtons.forEach((filterButton) => {
    const sortImagesWithTimeOut = debounce((filterType) => {
      let sortingPictures = pictures;
      switch (filterType) {
        case 'filter-random':
          sortingPictures = sortArrayRandom(pictures.slice()).slice(0, 10);
          break;
        case 'filter-discussed':
          sortingPictures = pictures.slice().sort(sortArrayByComments);
          break;
        default:
          sortingPictures = pictures;
          break;
      }
      renderImage(sortingPictures, onPictureClick);
    }, SORT_IMAGES_DELAY);

    filterButton.addEventListener('click', () => {
      const filterType = changeFilter(filterButton);
      sortImagesWithTimeOut(filterType);
    });
  });
};

export { sortImages };
