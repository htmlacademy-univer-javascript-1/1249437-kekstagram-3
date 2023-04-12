function getRandomNumber(from, to) {
  if (from > to || from < 0) {
    throw new Error('Неправильный диапазон');
  }
  else {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}

function checkMaxLength(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    return true
  }
  else {
    return false
  }
}

export {getRandomNumber, checkMaxLength};
