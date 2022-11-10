import {createPhotos} from './data.js';

const pictureConteiner = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const simularPhotos = createPhotos();

const createPictures = () => {
  const pictureFragment = document.createDocumentFragment();
  simularPhotos.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.appendChild(pictureElement);
  });
  pictureConteiner.appendChild(pictureFragment);
  return pictureFragment;
};

export {createPictures};
