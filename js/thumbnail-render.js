import {createSimilarImages} from './data.js';

const generatedImages = createSimilarImages();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureLink = pictureTemplate.querySelector('.picture');
const imagesFragment = document.createDocumentFragment();

generatedImages.forEach(({url, description, likes, comments}) => {
  const pictureLinkCloned = pictureLink.nodeClone(true);
  const pictureImg = pictureLinkCloned.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureLinkCloned.querySelector('picture__likes').textContent = likes;
  pictureLinkCloned.querySelector('picture__comments').textContent = comments.length;
  imagesFragment.append(pictureLinkCloned);
});

picturesContainer.append(imagesFragment);
