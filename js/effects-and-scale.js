import { MAX_SCALE_IMG, MIN_SCALE_IMG } from './util.js';

const imgUploadPreview = document.querySelector('.img-upload__preview');
const image = imgUploadPreview.querySelector('img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderElementValue = document.querySelector('.effect-level__value');
const filterLabels = document.querySelectorAll('.effects__label');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue  = document.querySelector('.scale__control--value');

const filters = {
  'none': {
    min: 0,
    max: 1,
    unit: '',
    step: 0,
    name: 'original',
    index: 0
  },
  'chrome': {
    min: 0,
    max: 1,
    unit: '',
    step: 0.1,
    name: 'grayscale',
    index: 1
  },
  'sepia': {
    min: 0,
    max: 1,
    unit: '',
    step: 0.1,
    name: 'sepia',
    index: 2
  },
  'marvin': {
    min: 0,
    max: 100,
    unit: '%',
    step: 1,
    name: 'invert',
    index: 3
  },
  'phobos': {
    min: 0,
    max: 3,
    unit: 'px',
    step: 0.1,
    name: 'blur',
    index: 4
  },
  'heat': {
    min: 1,
    max: 3,
    unit: '',
    step: 0.1,
    name: 'brightness',
    index: 5
  },
};

let currentEffect = 'original';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

sliderElement.setAttribute('hidden', true);

function updateImageEffect(effect, isUpdate) {
  const filter = filters[effect];
  if (filter) {
    const { min, max, step, unit, name } = filter;
    if (effect === 'none') {
      image.style.filter = 'none';
      sliderElement.setAttribute('hidden', true);
      image.className = '';
    } else {
      if (!isUpdate) {
        image.style.setProperty('filter', `${name}(${max}${unit})`);
        sliderElement.noUiSlider.updateOptions({
          range: { min, max },
          start: max,
          step
        });
        sliderElement.removeAttribute('hidden');
        image.className = '';
        image.classList.add(`effects__preview--${effect}`);
        currentEffect = effect;
      } else {
        const sliderValue = sliderElement.noUiSlider.get();
        image.style.filter = `${name}(${sliderValue}${unit})`;
      }
    }
  }
}

sliderElement.noUiSlider.on('slide', () => {
  sliderElementValue.value = sliderElement.noUiSlider.get();
  updateImageEffect(currentEffect, true);
});

filterLabels.forEach((filterLabel) => {
  const effect = filterLabel.getAttribute('for').slice(7);
  filterLabel.addEventListener('click', () => {
    updateImageEffect(effect);
  });
});

filterLabels.forEach( (filterLabelElement) => {
  filterLabelElement.addEventListener('click', () => {
    updateImageEffect(filterLabelElement.value);
  });
});

function getFilter() {
  return currentEffect;
}

const changeImageScale = (increase = true, img) => {
  let value = parseInt(scaleControlValue.value, 10) + (increase ? 25 : -25);
  if (value < MIN_SCALE_IMG) {
    value = MIN_SCALE_IMG;
  }
  if (value > MAX_SCALE_IMG) {
    value = MAX_SCALE_IMG;
  }
  scaleControlValue.value = `${value}%`;
  img.style.transform = `scale(${value / 100})`;
};

scaleControlBigger.addEventListener('click', () => {
  changeImageScale(true, imgUploadPreview);
});
scaleControlSmaller.addEventListener('click', () => {
  changeImageScale(false, imgUploadPreview);
});

function getScale() {
  return parseFloat(scaleControlValue.value);
}

function applyEffect(formData) {
  const currentScale = formData.scale;
  const currentFilter = formData.filter;
  scaleControlValue.value = `${currentScale}%`;
  imgUploadPreview.style.transform = `scaleControlValue(${currentScale / 100})`;
  updateImageEffect(currentFilter);
  filterLabels[filters[currentFilter].index].click();
}

export { applyEffect, getFilter, getScale };
