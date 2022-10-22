function getRandomPozitiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createIdGenerator () {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateCommentId = createIdGenerator();

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

const getRandomArrayElement = (elements) => elements[getRandomPozitiveInteger(0, elements.length - 1)];

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPozitiveInteger (1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const DESCRIPTIONS = [
  'Это моя любимая фотография',
  'Урррра! Сбылась моя мечта!',
  'Угадайте что было дальше?',
  '"Я так счастлив, я так рад, у меня есть ты..."',
];

function createRandomIdFromRangeGenerator (a, b) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPozitiveInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPozitiveInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoIdUrl = createRandomIdFromRangeGenerator(1, 25);

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoIdUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPozitiveInteger(15, 200),
  comments: createComment()
});

const simularPhotos = Array.from({length: 25}, createPhoto);
simularPhotos([]);

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength ('1sdfs', 1);

