import { isEscapeKey, openSomeModal, closeSomeModal } from './util.js';
import { sendData } from './api.js';
import { openSuccessfulSendingMessage, openErrorSendingMessage } from './status-modals.js';
import { resetImageForm } from './reset-image-form.js';
import { imagePreview } from './image-scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGULAR = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_NUMBER = 5;
const ErrorMessages = {
  COMMENT_LENGTH_ERROR: `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  HASHTAGS_VALIDATE_ERROR: 'Введён невалидный хэштег',
  HASHTAGS_NUMBER_ERROR: 'Превышено количество хэштегов',
  HASHTAGS_REPEAT_ERROR: 'Хэштеги повторяются'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const imageUploadButton = document.querySelector('.img-upload__submit');
const imageComment = document.querySelector('.text__description');
const imageHashtags = document.querySelector('.text__hashtags');
const imageUploadInput = document.querySelector('.img-upload__input');
const effectsPreviews = document.querySelectorAll('.effects__preview');

//Создание валидатора формы
const imageUploadValidator = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Реализация открытия формы
const onImageUploadOverlayKeyDown = (evt) => {
  if (isEscapeKey(evt) && imageComment !== document.activeElement && imageHashtags !== document.activeElement) {
    evt.preventDefault();
    closeImageUploadOverlay();
    resetImageForm(imageUploadForm, imageUploadValidator);
  }
};

resetImageForm(imageUploadForm, imageUploadValidator);

const openImageUploadOverlay = () => {
  openSomeModal(imageUploadOverlay, onImageUploadOverlayKeyDown);
};

function closeImageUploadOverlay () {
  closeSomeModal(imageUploadOverlay, onImageUploadOverlayKeyDown);
}

imageUploadInput.addEventListener('change', () => {
  openImageUploadOverlay();
  const file = imageUploadInput.files[0];
  const fileUrl = URL.createObjectURL(file);
  const fileName = file.name.toLowerCase();
  const isMatches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (isMatches) {
    imagePreview.src = fileUrl;
    effectsPreviews.forEach((effectsPreview) => {
      effectsPreview.style.backgroundImage = `url("${fileUrl}")`;
    });
  }
});

imageUploadCancel.addEventListener('click', () => {
  closeImageUploadOverlay();
  resetImageForm(imageUploadForm, imageUploadValidator);
});

// Реализация валидации формы
// Поле ввода комментария
const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;
imageUploadValidator.addValidator(imageComment, validateComment, ErrorMessages.COMMENT_LENGTH_ERROR);

// Поле ввода хэштегов
const prepareHashtags = (value) => value.toLowerCase().trim().replace(/\s+/g, ' ').split(' ');

const validateHashtags = (value) => {
  const hashtags = prepareHashtags(value);
  const hashTagsRegularityCheck = hashtags.some((hashtag) => !HASHTAG_REGULAR.test(hashtag));
  return !hashTagsRegularityCheck || value === '';
};
imageUploadValidator.addValidator(imageHashtags, validateHashtags, ErrorMessages.HASHTAGS_VALIDATE_ERROR);

const validateHashtagsNumber = (value) => {
  const hashtags = prepareHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_NUMBER;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtagsNumber, ErrorMessages.HASHTAGS_NUMBER_ERROR);

const validateHashtagsRepetition = (value) => {
  const hashtags = prepareHashtags(value);
  return new Set(hashtags).size === hashtags.length;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtagsRepetition, ErrorMessages.HASHTAGS_REPEAT_ERROR);

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = imageUploadValidator.validate();

  if (isValid) {
    imageUploadButton.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        openSuccessfulSendingMessage();
        resetImageForm(imageUploadForm, imageUploadValidator);
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
