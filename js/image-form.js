import { isEscapeKey } from './util.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const imageComment = document.querySelector('.text__description');
const imageHashtags = document.querySelector('.text__hashtags');


// Реализация открытия формы
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

// Реализация валидации формы
const imageUploadValidator = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Поле ввода комментария
const maxCommentLength = 140;
const validateComment = (value) => value.length < maxCommentLength;
imageUploadValidator.addValidator(imageComment, validateComment, `Длина комментария больше ${maxCommentLength} символов`);

// Поле ввода хэштегов
const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i;
const validateHashtags = (value) => {
  const hashtagsArray = value.split(' ');
  const hashTagsRegularityCheck = hashtagsArray.some((hashtag) => !hashtagRegular.test(hashtag));
  return !hashTagsRegularityCheck;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtags, 'Введён невалидный хэштег');

const maxHashtagsNumber = 5;
const validateHashtagsNumber = (value) => {
  const hashtagsArray = value.trimEnd().split(' ');
  return hashtagsArray.length <= maxHashtagsNumber;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtagsNumber, 'Превышено количество хэштегов');

const validateHashtagsRepetition = (value) => {
  const hashtagsArray = value.trimEnd().split(' ');
  return new Set(hashtagsArray).size === hashtagsArray.length;
};
imageUploadValidator.addValidator(imageHashtags, validateHashtagsRepetition, 'Хэштеги повторяются');
