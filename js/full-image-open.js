import { isEscapeKey, openSomeModal, closeSomeModal } from './util.js';
import { socialCommentsList, socialCommentTotalCount, renderComments } from './render-comments.js';
import { renderFullImage } from './full-image-render.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const pictureLinks = document.querySelectorAll('.picture');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
let socialCommentShownCountNumber = Number(socialCommentShownCount.textContent);
const commentsLoader = document.querySelector('.comments-loader');
let bigImageComments = [];
const COMMENTS_STEP = 5;

const onCommentsLoaderClick = () => {
  socialCommentsList.innerHTML = '';
  socialCommentShownCountNumber += COMMENTS_STEP;
  socialCommentShownCount.textContent = socialCommentShownCountNumber;

  if (socialCommentShownCountNumber >= Number(socialCommentTotalCount.textContent)) {
    socialCommentShownCount.textContent = socialCommentTotalCount.textContent;
    commentsLoader.classList.add('hidden');
  }
  renderComments(bigImageComments, Number(socialCommentShownCount.textContent));
};

const onBigPictureKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageModal();
  }
};

const openImageModal = (photosData) => {
  openSomeModal(bigPicture, onBigPictureKeyDown);
  bigImageComments = photosData.comments;
  socialCommentTotalCount.textContent = bigImageComments.length;
  socialCommentsList.innerHTML = '';
  socialCommentShownCount.textContent = COMMENTS_STEP;
  socialCommentShownCountNumber = COMMENTS_STEP;

  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  renderFullImage(photosData);
  if (Number(socialCommentTotalCount.textContent) <= COMMENTS_STEP) {
    socialCommentShownCount.textContent = socialCommentTotalCount.textContent;
    commentsLoader.classList.add('hidden');
  }
  renderComments(bigImageComments, Number(socialCommentShownCount.textContent));
};

function closeImageModal() {
  closeSomeModal(bigPicture, onBigPictureKeyDown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

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

export {openImageModal};
