import { getRandomNumber } from './util.js';

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
