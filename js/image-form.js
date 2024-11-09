import { isEscapeKey } from './util.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');

const onImageUploadOverlayKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imageUploadOverlay.classList.add('hidden');
  }
};

const openImageUploadOverlay = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onImageUploadOverlayKeyDown);
};

const closeImageUploadOverlay = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onImageUploadOverlayKeyDown);
  imageUploadInput.value = '';
};

imageUploadInput.addEventListener('change', () => {
  openImageUploadOverlay();
});

imageUploadCancel.addEventListener('click', () => {
  closeImageUploadOverlay();
});
