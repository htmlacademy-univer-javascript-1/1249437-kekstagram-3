const form = document.querySelector('.img-upload__form');
const effectRadios = document.querySelectorAll('.effects__radio');
const previewImg = form.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');

const effects = {
  chrome: {
    min: 0,
    max: 1,
    unit: '',
    filter: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    unit: '',
    filter: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    unit: '%',
    filter: 'invert',
  },
  phobos: {
    min: 0,
    max: 3,
    unit: 'px',
    filter: 'blur',
  },
  heat: {
    min: 1,
    max: 3,
    unit: '',
    filter: 'brightness',
  },
};

let currentEffect = 'none';

const setEffect = (effect) => {
  if (effect === 'none') {
    previewImg.style.filter = '';
    slider.style.display = 'none';
  } else {
    const effectOptions = effects[effect];
    previewImg.style.filter = `${effectOptions.filter}(${effectOptions.min}${effectOptions.unit})`;
    slider.noUiSlider.updateOptions({
      range: {
        min: effectOptions.min,
        max: effectOptions.max,
      },
      step: effectOptions.unit === '%' ? 1 : 0.1,
      start: effectOptions.max,
    });
    slider.style.display = 'block';
  }
  currentEffect = effect;
  sliderValue.value = 100;
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
});

slider.noUiSlider.on('update', (values) => {
  const effectOptions = effects[currentEffect];
  const value = values[0];
  previewImg.style.filter = `${effectOptions.filter}(${value}${effectOptions.unit})`;
  sliderValue.value = Math.round(value);
});

const removeFilter = () => {
  setEffect('none');
};

const addFilter = (evt) => {
  setEffect(evt.target.value);
};

const addListeners = () => {
  effectRadios.forEach((radio) => {
    if (radio.value === 'none') {
      radio.addEventListener('click', removeFilter);
    } else {
      radio.addEventListener('click', addFilter);
    }
  });
};

const removeListeners = () => {
  effectRadios.forEach((radio) => {
    if (radio.value === 'none') {
      radio.removeEventListener('click', removeFilter);
    } else {
      radio.removeEventListener('click', addFilter);
    }
  });
};

const initFilters = () => {
  addListeners();
  setEffect(currentEffect);
};

const destroyFilters = () => {
  removeListeners();
  setEffect('none');
};

initFilters();
destroyFilters();
