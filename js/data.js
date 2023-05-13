import { getRandomNumber } from './util.js';

const picturesArray = [];
for (let i = 0; i < 25; i++) {
  const pictureId = i + 1;
  const pictureUrl = `photos/${i+1}.jpg`;
  const newPicture = {
    id: pictureId,
    url: pictureUrl,
    description: `Ссылка: ${pictureUrl}, номер: ${pictureId}`,
    likes: getRandomNumber(15, 200),
    comments: getRandomNumber(0, 200)
  };
  picturesArray.push(newPicture);
}

export { picturesArray };
