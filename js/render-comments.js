const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const renderComments = (comments) => {
  socialCommentTotalCount.textContent = comments.length;
  comments.forEach((comment) => {
    const socialCommentCloned = socialComment.cloneNode(true);
    const socialAvatar = socialCommentCloned.querySelector('.social__picture');
    socialAvatar.src = comment.avatar;
    socialAvatar.alt = comment.name;
    socialCommentCloned.querySelector('.social__text').textContent = comment.message;
    socialCommentsList.append(socialCommentCloned);
  });
};

export {renderComments, socialCommentsList, socialCommentTotalCount};
