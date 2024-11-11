import { isEscapeKey } from './util.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const imageComment = document.querySelector('.text__description');
const imageHashtags = document.querySelector('.text__hashtags');

// Реализация открытия формы
const onImageUploadOverlayKeyDown = (evt) => {
  if (isEscapeKey(evt) && imageComment !== document.activeElement && imageHashtags !== document.activeElement) {
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
