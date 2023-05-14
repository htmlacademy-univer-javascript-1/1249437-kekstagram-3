import { showAlert, SERVER_URL, ERR_FETCH_MESSAGE, ERR_SEND_MESSAGE } from './util.js';
import { hashtag, description, getSrc, showMessage } from './upload-pictures.js';
import { getFilter, getScale } from './effects-and-scale.js';

export const fetchData = (onSuccess) => {
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(ERR_FETCH_MESSAGE);
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      showAlert(ERR_FETCH_MESSAGE);
    });
};

let isError = false;

export const sendData = (onSuccess, body) => {
  isError = false;
  localStorage.setItem('hashtagValue', hashtag.value);
  localStorage.setItem('descriptionValue', description.value);
  localStorage.setItem('currentFilter', getFilter());
  localStorage.setItem('currentScale', getScale().toString());
  localStorage.setItem('currentImage', getSrc());
  fetch(`${SERVER_URL}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess(response.json());
        showMessage(true);
      } else {
        showAlert(ERR_SEND_MESSAGE);
        showMessage(false);
        isError = true;
      }
    })
    .then((data) => onSuccess(data))
    .catch(() => {
      showMessage(false);
      showAlert(ERR_SEND_MESSAGE);
      isError = true;
    });
};

export {isError};
