const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const socialCommentsList = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');

const renderComments = (comments, shownCount) => {
  socialCommentTotalCount.textContent = comments.length;
  for (let i = 0; i < shownCount; i++) {
    const socialCommentCloned = socialComment.cloneNode(true);
    const socialAvatar = socialCommentCloned.querySelector('.social__picture');
    socialAvatar.src = comments[i].avatar;
    socialAvatar.alt = comments[i].name;
    socialCommentCloned.querySelector('.social__text').textContent = comments[i].message;
    socialCommentsList.append(socialCommentCloned);
  }
};

export {renderComments, socialCommentsList, socialCommentTotalCount};
