import {showBigPicture} from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const imageFilters = document.querySelector('.img-filters');

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures.length > 0) {
    pictures.forEach((picture) => picture.remove());
  }
};

const createPictures = (pictures) => {
  clearPictures();
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
    });
  });

  pictureContainer.appendChild(pictureFragment);
  imageFilters.classList.remove('img-filters--inactive');
};

export {createPictures};
