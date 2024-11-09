const bigPictureImage = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');

const renderFullImage = (evt) => {
  const currentImage = evt.currentTarget.querySelector('.picture__img');
  bigPictureImage.src = currentImage.src;
  socialCaption.textContent = currentImage.alt;
  likesCount.textContent = evt.currentTarget.querySelector('.picture__likes').textContent;
};


export {renderFullImage};
