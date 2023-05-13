import { checkLength, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, MIN_HASHTAG_LENGTH, MAX_HASHTAG_LENGTH }
  from './util.js';
import { closeImageUpload } from './upload-pictures.js';
import { sendData } from './server.js';

const imageForm = document.querySelector('.img-upload__form');
const hashTagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristineComment= new Pristine (imageForm, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const pristineHashTag= new Pristine (imageForm, {
  classTo: 'img-upload__text',
  errorClass: 'form--invalid',
  successClass: 'form--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateComment(comment) {
  return !checkLength(comment, MIN_COMMENT_LENGTH) && checkLength(comment, MAX_COMMENT_LENGTH);
}

pristineComment.addValidator(
  imageForm.querySelector('.text__description'), validateComment,
  'Комментарий должен содержать от 20 до 140 символов');

function validateHashTag(hashTag) {
  if (hashTag === '') {
    return true;
  }
  return hashTagRegex.test(hashTag) && !checkLength(hashTag, MIN_HASHTAG_LENGTH) && checkLength(hashTag, MAX_HASHTAG_LENGTH);
}

pristineHashTag.addValidator(
  imageForm.querySelector('.text__hashtags'), validateHashTag,
  'Хэштег должен начинаться с # и содержать не более 20 символов');

imageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristineHashTag.validate() && pristineComment.validate()) {
    evt.target.querySelector('.img-upload__submit').disabled = true;
    sendData( () => {
      evt.target.querySelector('.img-upload__submit').disabled = false;
    },
    new FormData(evt.target)
    );
    closeImageUpload();
  }
});
