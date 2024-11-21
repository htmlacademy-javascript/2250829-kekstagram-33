const bigPictureImage = document.querySelector('.big-picture__img img');
const socialCaption = document.querySelector('.social__caption');
const likesCount = document.querySelector('.likes-count');

const renderFullImage = (photosData) => {
  bigPictureImage.src = photosData.url;
  socialCaption.textContent = photosData.description;
  likesCount.textContent = photosData.likes;
};


export { renderFullImage };
