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

function createArrayForPictures() {
  const arrayForPictures = [];

  for (let i = 0; i < 25; i++) {
    const id = i + 1;
    const url = 'photos/${i+1}.jpg';
    const description = 'nice picture (^_~)';
    const likes = getRandomNumber(25, 200);
    const comments = getRandomNumber(0, 200);
    const picture = {
      id,
      url,
      description,
      likes,
      comments
    };
    arrayForPictures.push(picture);
  }
}

export {arrayForPictures}
