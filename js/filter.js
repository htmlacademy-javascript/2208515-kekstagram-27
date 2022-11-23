import {getRandomArrayFromRange} from './util.js';

const MAX_COUNT_RANDOM = 10;

const filters = document.querySelector('.img-filters');

const comparePictures = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;
  return rankB - rankA;
};

const sortDiscussed = (pictures) => pictures.slice().sort(comparePictures);

const toggleFilter = (filter) => {
  const currentFilter = document.querySelector('.img-filters__button--active');
  currentFilter.classList.remove('img-filters__button--active');
  filter.classList.add('img-filters__button--active');
};

const setFilterClickHandler = (pictures, cb) => {
  filters.addEventListener('click', (evt) => {
    switch (evt.target.id) {
      case 'filter-random':
        toggleFilter(evt.target);
        cb(getRandomArrayFromRange(pictures, MAX_COUNT_RANDOM));
        break;

      case 'filter-discussed':
        toggleFilter(evt.target);
        cb(sortDiscussed(pictures));
        break;

      case 'filter-default':
        toggleFilter(evt.target);
        cb(pictures);
        break;
    }
  });
};

export {setFilterClickHandler};

