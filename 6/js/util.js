const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getIdGenerator = () => {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getRandomIdFromRangeGenerator = (a, b) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomPositiveInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;
checkStringLength ('1sdfs', 1);

export {getRandomPositiveInteger, getRandomArrayElement, getIdGenerator, getRandomIdFromRangeGenerator};
