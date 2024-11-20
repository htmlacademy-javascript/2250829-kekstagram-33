const imageFilters = document.querySelector('.img-filters');
const imageFiltersButtons = document.querySelectorAll('.img-filters__button');

const changeFilter = (filterButton) => {
  imageFiltersButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  filterButton.classList.add('img-filters__button--active');
  return filterButton.id;
};

export { imageFilters, changeFilter, imageFiltersButtons };
