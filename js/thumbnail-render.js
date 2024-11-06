import {createSimilarImages} from './data.js';

const generatedImages = createSimilarImages(25);
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');
const imagesFragment = document.createDocumentFragment();


generatedImages.forEach(({url, description, likes, comments}) => {
  const pictureLinkCloned = pictureLink.cloneNode(true);
  const pictureImg = pictureLinkCloned.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;
  const pictureInfo = pictureLinkCloned.querySelector('.picture__info');
  pictureInfo.querySelector('.picture__likes').textContent = likes;
  pictureInfo.querySelector('.picture__comments').textContent = comments.length;
  imagesFragment.append(pictureLinkCloned);
});

picturesContainer.append(imagesFragment);
