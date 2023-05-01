const imageForm = document.querySelector('.img-upload__form');
const regex = new RegExp('^#[A-Za-zА-Яа-яЁё0-9]{1-19}$');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

function validateComment(comment) {
  return comment.length >= 20 && comment.length <= 140;
}

pristine.addValidator(
  imageForm.querySelector('.text__description'), validateComment, 'Комментарий должен содержать от 20 до 140 символов');

function validateHashTag(hashTag) {
  return hashTag.length <= 20 || regex.text(hashTag);
}

pristine.addValidator(
  imageForm.querySelector('.text__hashtags'), validateHashTag, 'Хэштег должен начинаться с # и содержать не более 20 символов');
