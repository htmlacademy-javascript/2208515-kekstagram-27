import {getRandomPositiveInteger, getRandomArrayElement, getIdGenerator, getRandomIdFromRangeGenerator} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Анна',
  'Роман',
  'Вячеслав',
  'Ирина',
  'Дмитрий',
  'Николай',
  'Рудольф'
];

const DESCRIPTIONS = [
  'Это моя любимая фотография',
  'Урррра! Сбылась моя мечта!',
  'Угадайте что было дальше?',
  '"Я так счастлив, я так рад, у меня есть ты..."',
];

const generateCommentId = getIdGenerator();
const generatePhotoId = getRandomIdFromRangeGenerator(1, 25);
const generatePhotoIdUrl = getRandomIdFromRangeGenerator(1, 25);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger (1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const PHOTO_COUNT = 25;

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoIdUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: createComment()
});

const createPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

export {createPhotos};
