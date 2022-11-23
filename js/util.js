const ALERT_SHOW_TIME = 5000;

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

// const getRandomIdFromRangeGenerator = (a, b) => {
//   const previousValues = [];
//   return function () {
//     let currentValue = getRandomPositiveInteger(a, b);
//     if (previousValues.length >= (b - a + 1)) {
//       return null;
//     }
//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomPositiveInteger(a, b);
//     }
//     previousValues.push(currentValue);
//     return currentValue;
//   };
// };

// const getRandomArrayFromRange = (a, b, count) => {
//   const generate = getRandomIdFromRangeGenerator(a, b);
//   const result = [];
//   for (let i = 1; i <= count; i++) {
//     result.push(generate());
//   }
//   return result;
// };

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.lineHeight = '36px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#232321';
  alertContainer.style.border = '3px solid red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this,rest),timeoutDelay);
  };
};

const getRandomArrayFromRange = (array, countElement) => {
  if (array.length <= countElement) {
    return array;
  }

  let resultArray = [];
  while (resultArray.length !== countElement) {
    resultArray.push(getRandomArrayElement(array));
    resultArray = Array.from(new Set(resultArray));
  }
  return resultArray;
};

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  getIdGenerator,
  //getRandomIdFromRangeGenerator,
  getRandomArrayFromRange,
  isEscapeKey,
  showAlert,
  debounce,
  // sortingDiscussed,
  // getRandomArray
};
