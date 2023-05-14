const MIN_COMMENT_LENGTH = 19;
const MAX_COMMENT_LENGTH = 140;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MIN_SCALE_IMG = 25;
const MAX_SCALE_IMG= 100;
const SERVER_URL = 'https://27.javascript.pages.academy/kekstagram-simple';
const ERR_FETCH_MESSAGE = 'Произошла ошибка при загрузке данных. Пожалуйста, попробуйте обновить страницу.';
const ERR_SEND_MESSAGE = 'Возникли проблемы с отправкой формы. Пожалуйста, проверьте ваше интернет-соединение.';

function getRandomNumber(from, to) {
  if (from > to || from < 0) {
    throw new Error('Неправильный диапазон');
  }
  else {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}

function checkLength(inputString, maxLength) {
  return inputString.length <= maxLength;
}

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '10px';
  alertContainer.style.top = '10px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.fontFamily = 'Times New Roman';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'purple';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, 7000);
}

export {
  getRandomNumber, checkLength, showAlert,
  MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, MIN_HASHTAG_LENGTH, MAX_HASHTAG_LENGTH, SERVER_URL, ERR_FETCH_MESSAGE,
  ERR_SEND_MESSAGE, MIN_SCALE_IMG, MAX_SCALE_IMG
};
