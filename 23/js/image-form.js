import { isEscapeKey, openSomeModal, closeSomeModal } from './util.js';
import { sendData } from './api.js';
import { openSuccessfulSendingMessage, openErrorSendingMessage } from './status-modals.js';
import { imageComment, imageHashtags, imageUploadInput, resetImageForm } from './reset-image-form.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const imageUploadButton = document.querySelector('.img-upload__submit');

// Реализация открытия формы
const onImageUploadOverlayKeyDown = (evt) => {
  if (isEscapeKey(evt) && imageComment !== document.activeElement && imageHashtags !== document.activeElement) {
    evt.preventDefault();
    closeImageUploadOverlay();
    resetImageForm();
  }
};

resetImageForm();

const openImageUploadOverlay = () => {
  openSomeModal(imageUploadOverlay, onImageUploadOverlayKeyDown);
};

function closeImageUploadOverlay () {
  closeSomeModal(imageUploadOverlay, onImageUploadOverlayKeyDown);
}

imageUploadInput.addEventListener('change', () => {
  openImageUploadOverlay();
});

imageUploadCancel.addEventListener('click', () => {
  closeImageUploadOverlay();
  resetImageForm();
});

// Реализация валидации формы
const imageUploadValidator = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Поле ввода комментария
const MAX_COMMENT_LENGTH = 140;
const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;
imageUploadValidator.addValidator(imageComment, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

// Поле ввода хэштегов
const HASHTAG_REGULAR = /^#[a-zа-яё0-9]{1,19}$/i;
const validateHashtags = (value) => {
  const hashtagsArray = value.trim().replace(/\s+/g, ' ').split(' ');
  const hashTagsRegularityCheck = hashtagsArray.some((hashtag) => !HASHTAG_REGULAR.test(hashtag));
  return !hashTagsRegularityCheck || value === '';
};
imageUploadValidator.addValidator(imageHashtags, validateHashtags, 'Введён невалидный хэштег');

const MAX_HASHTAGS_NUMBER = 5;
const validateHashtagsNumber = (value) => {
  const hashtagsArray = value.trim().replace(/\s+/g, ' ').split(' ');
  return hashtagsArray.length <= MAX_HASHTAGS_NUMBER;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtagsNumber, 'Превышено количество хэштегов');

const validateHashtagsRepetition = (value) => {
  const hashtagsArray = value.trim().replace(/\s+/g, ' ').split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtagsRepetition, 'Хэштеги повторяются');


imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = imageUploadValidator.validate();

  if (isValid) {
    imageUploadButton.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        openSuccessfulSendingMessage();
        resetImageForm();
      })
      .catch(() => {
        openErrorSendingMessage(openImageUploadOverlay);
      })
      .finally(() => {
        closeImageUploadOverlay();
        imageUploadButton.disabled = false;
      });
  }
});


