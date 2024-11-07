import {createSimilarImages} from './data.js';

const generatedImages = createSimilarImages(25);
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');
const imagesFragment = document.createDocumentFragment();


const createImage = (picture) => {
  const pictureLinkCloned = pictureLink.cloneNode(true);
  const pictureImg = pictureLinkCloned.querySelector('.picture__img');
  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  const pictureInfo = pictureLinkCloned.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__likes').textContent = picture.likes;
  pictureInfo.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureLinkCloned.myComments = picture.comments;
  pictureLinkCloned.myId = picture.id;

  return pictureLinkCloned;
};

generatedImages.forEach((picture) => {
  const newImage = createImage(picture);
  imagesFragment.append(newImage);
});

picturesContainer.append(imagesFragment);
