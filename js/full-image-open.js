import { isEscapeKey } from './util.js';
import { socialCommentsList, socialCommentTotalCount } from './render-comments.js';
import { renderFullImage } from './full-image-render.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const pictureLinks = document.querySelectorAll('.picture');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
let socialCommentShownCountNumber = Number(socialCommentShownCount.textContent);
const commentsLoader = document.querySelector('.comments-loader');

const onCommentsLoaderClick = () => {
  socialCommentShownCountNumber += 5;
  socialCommentShownCount.textContent = socialCommentShownCountNumber;

  if (socialCommentShownCountNumber >= Number(socialCommentTotalCount.textContent)) {
    socialCommentShownCount.textContent = socialCommentTotalCount.textContent;
    commentsLoader.classList.add('hidden');
  }
};

const onBigPictureKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

const openImageModal = (evt) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  socialCommentsList.innerHTML = '';
  socialCommentShownCount.textContent = 5;
  socialCommentShownCountNumber = 5;

  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderFullImage(evt);
  if (Number(socialCommentTotalCount.textContent) <= 5) {
    socialCommentShownCount.textContent = socialCommentTotalCount.textContent;
    commentsLoader.classList.add('hidden');
  }

  document.addEventListener('keydown', onBigPictureKeyDown);
};

const closeImageModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.add('modal-open');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
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
