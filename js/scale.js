const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;

const resizeImage = (newScale) => {
  scaleControlValue.value = `${newScale}%`;
  imgUploadPreview.style.transform = `scale(${newScale/100})`;
};

const decreaseScale = () => {
  const currentScale = Number(scaleControlValue.value.replace('%', ''));
  if (currentScale > MIN_SCALE) {
    resizeImage(currentScale - SCALE_STEP);
  }
};

const increaseScale = () => {
  const currentScale = Number(scaleControlValue.value.replace('%', ''));
  if (currentScale < MAX_SCALE) {
    resizeImage(currentScale + SCALE_STEP);
  }
};

scaleControlSmaller.addEventListener('click', decreaseScale);
scaleControlBigger.addEventListener('click', increaseScale);

