import { isEscapeKey } from './util.js';
import { renderFullImage, socialCommentsList } from './full-image-render.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const pictureLinks = document.querySelectorAll('.picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const onBigPictureKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const openImageModal = (evt) => {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  socialCommentsList.innerHTML = '';
  renderFullImage(evt);

  document.addEventListener('keydown', onBigPictureKeyDown);
};

const closeImageModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.removeEventListener('keydown', onBigPictureKeyDown);
};

pictureLinks.forEach((pictureLink) => {
  pictureLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    openImageModal(evt);
  });
});


bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeImageModal();
});

