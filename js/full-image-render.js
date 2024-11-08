const bigPictureImage = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const renderComments = (comments) => {
  comments.forEach((comment) => {
    const socialCommentCloned = socialComment.cloneNode(true);
    const socialAvatar = socialCommentCloned.querySelector('.social__picture');
    socialAvatar.src = comment.avatar;
    socialAvatar.alt = comment.name;
    socialCommentCloned.querySelector('.social__text').textContent = comment.message;
    socialCommentsList.append(socialCommentCloned);
  });
};

const renderFullImage = (evt) => {
  const currentImage = evt.currentTarget.querySelector('.picture__img');
  bigPictureImage.src = currentImage.src;
  socialCaption.textContent = currentImage.alt;
  likesCount.textContent = evt.currentTarget.querySelector('.picture__likes').textContent;
  socialCommentTotalCount.textContent = evt.currentTarget.querySelector('.picture__comments').textContent;
  renderComments(evt.currentTarget.myComments);
};


export {renderFullImage, socialCommentsList};
