import { scaleValue, SCALE_VALUE_MAX_NUMBER, imagePreview, changeImageScale } from './image-scale.js';

const imageComment = document.querySelector('.text__description');
const imageHashtags = document.querySelector('.text__hashtags');
const imageUploadInput = document.querySelector('.img-upload__input');
const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectOriginal = document.querySelector('#effect-none');

const resetImageForm = () => {
  imageComment.value = '';
  imageHashtags.value = '';
  imageUploadInput.value = '';
  scaleValue.value = `${SCALE_VALUE_MAX_NUMBER}%`;
  changeImageScale(SCALE_VALUE_MAX_NUMBER);
  imagePreview.style.transform = 'scale(1)';
  imagePreview.style.filter = 'none';
  effectSliderContainer.style.display = 'none';
  effectOriginal.checked = true;
};

export { imageComment, imageHashtags, imageUploadInput, resetImageForm, effectSliderContainer, effectOriginal };
