function getRandomInt (min, max) {
  return min < 0 || max < 0 || min >= max ? NaN : Math.floor(Math.random() * (max - min)) + min;
}

getRandomInt(0, 100);


const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength ('1sdfs', 1);

