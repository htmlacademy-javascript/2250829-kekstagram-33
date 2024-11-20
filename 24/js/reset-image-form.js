import { SCALE_VALUE_MAX_NUMBER, imagePreview, changeImageScale } from './image-scale.js';

const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectOriginal = document.querySelector('#effect-none');

const resetImageForm = (currentForm) => {
  currentForm.reset();
  changeImageScale(SCALE_VALUE_MAX_NUMBER);
  imagePreview.style.transform = 'scale(1)';
  imagePreview.style.filter = 'none';
  effectSliderContainer.style.display = 'none';
  effectOriginal.checked = true;
};

export { resetImageForm, effectSliderContainer, effectOriginal };
