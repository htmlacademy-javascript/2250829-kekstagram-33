const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');
const imagesFragment = document.createDocumentFragment();


const createImage = (picture, onPictureClick) => {
  const pictureLinkCloned = pictureLink.cloneNode(true);
  const pictureImg = pictureLinkCloned.querySelector('.picture__img');
  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  const pictureInfo = pictureLinkCloned.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__likes').textContent = picture.likes;
  pictureInfo.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureLinkCloned.addEventListener('click', () => {
    onPictureClick(picture);
  });

  return pictureLinkCloned;
};

const renderImage = (photosData, onPictureClick) => {
  photosData.forEach((picture) => {
    const newImage = createImage(picture, onPictureClick);
    imagesFragment.append(newImage);
  });
  picturesContainer.append(imagesFragment);
};

export { renderImage };
