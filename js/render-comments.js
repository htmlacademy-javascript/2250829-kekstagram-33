const socialCommentsTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const renderOneComment = (comment) => {
  const socialCommentCloned = socialComment.cloneNode(true);
  const socialAvatar = socialCommentCloned.querySelector('.social__picture');
  socialAvatar.src = comment.avatar;
  socialAvatar.alt = comment.name;
  socialCommentCloned.querySelector('.social__text').textContent = comment.message;
  socialCommentsList.append(socialCommentCloned);
};

const renderComments = (comments, shownCount) => {
  socialCommentsTotalCount.textContent = comments.length;
  for (let i = 0; i < shownCount; i++) {
    renderOneComment(comments[i]);
  }
};


export {renderComments, socialCommentsList, socialCommentsTotalCount};
