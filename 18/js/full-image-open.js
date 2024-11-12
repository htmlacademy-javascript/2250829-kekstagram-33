import { isEscapeKey } from './util.js';
import { socialCommentsList, socialCommentTotalCount, renderComments } from './render-comments.js';
import { renderFullImage } from './full-image-render.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const pictureLinks = document.querySelectorAll('.picture');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
let socialCommentShownCountNumber = Number(socialCommentShownCount.textContent);
const commentsLoader = document.querySelector('.comments-loader');
let bigImageComments = [];

const onCommentsLoaderClick = () => {
  socialCommentsList.innerHTML = '';
  socialCommentShownCountNumber += 5;
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

const openImageModal = (evt) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigImageComments = evt.currentTarget.myComments;
  socialCommentTotalCount.textContent = bigImageComments.length;
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
  renderComments(bigImageComments, Number(socialCommentShownCount.textContent));

  document.addEventListener('keydown', onBigPictureKeyDown);
};

function closeImageModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.add('modal-open');

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onBigPictureKeyDown);
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
