import { applyEffect } from './effects-and-scale.js';
import { isError } from './server.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('.img-upload__input');
const uploadFileInput = document.querySelector('#upload-file');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeImageUploadButton = document.querySelector('.img-upload__cancel');
const previewImage = document.querySelector('.img-upload__preview')
  .querySelector('img');
const description = document.querySelector('.text__description');
const hashtag = document.querySelector('.text__hashtags');

function restoreImageData() {
  previewImage.src = localStorage.getItem('currentImage');
  hashtag.value = localStorage.getItem('hashtagValue');
  description.value = localStorage.getItem('descriptionValue');
  const savedFormData = {
    filter: localStorage.getItem('currentFilter'),
    scale: localStorage.getItem('currentScale'),
  };
  applyEffect(savedFormData);
}

function resetFormData() {
  hashtag.value = '';
  description.value = '';
  uploadFileInput.value = '';
  const defaultFormData = {
    filter: 'none',
    scale: '100',
  };
  applyEffect(defaultFormData);
}

function cleanForm() {
  resetFormData();
  uploadForm.reset();
  submitButton.disabled = false;
}

function closeImageUpload() {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', handleEscapeKey);
  cleanForm();
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeImageUpload();
  }
}

function openImageUpload() {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', handleEscapeKey);
  previewImage.src = window.URL.createObjectURL(fileInput.files[0]);
  if (isError) {
    restoreImageData();
  }
}

fileInput.addEventListener('change', openImageUpload);
closeImageUploadButton.addEventListener('click', closeImageUpload);

function showMessage(isSuccess) {
  const templateId = isSuccess ? '#success' : '#error';
  const template = document.querySelector(templateId).content.cloneNode(true);
  const messageClass = isSuccess ? '.success' : '.error';
  const message = template.querySelector(messageClass);
  const button = template.querySelector(isSuccess ? '.success__button' : '.error__button');
  button.addEventListener('click', () => hideMessage(isSuccess));
  document.addEventListener('keydown', (evt) => onEscKeyPress(evt));
  document.addEventListener('click', (evt) => onDocumentClick(evt));
  document.body.append(message);
}

function hideMessage(isSuccess) {
  const message = document.querySelector(isSuccess ? '.success' : '.error');
  message.remove();
  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onDocumentClick);
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    const successMessage = document.querySelector('.success');
    const errorMessage = document.querySelector('.error');
    if (successMessage) {
      hideMessage(true);
    }
    if (errorMessage) {
      hideMessage(false);
    }
  }
}

function onDocumentClick(event) {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');
  const successInner = document.querySelector('.success__inner');
  const errorInner = document.querySelector('.error__inner');
  if (successMessage && successMessage.contains(event.target) && !successInner.contains(event.target)) {
    hideMessage(true);
    return;
  }
  if (errorMessage && errorMessage.contains(event.target) && !errorInner.contains(event.target)) {
    hideMessage(false);
  }
}

function getSrc() {
  return previewImage.src;
}

export { closeImageUpload, showMessage, getSrc, description, hashtag };
