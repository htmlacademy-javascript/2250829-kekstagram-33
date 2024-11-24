import { imagePreview } from './image-scale.js';
import { effectOriginal, imageUploadEffectLevelFieldset } from './reset-image-form.js';

const SLIDER_DEFAULT_MIN = 0;
const SLIDER_DEFAULT_MAX = 1;
const SLIDER_DEFAULT_START = 1;
const SLIDER_DEFAULT_STEP = 0.1;

const effectsRadioInputs = document.querySelectorAll('.effects__radio:not(#effect-none)');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectSliderContainer = document.querySelector('.effect-level__slider');

noUiSlider.create(effectSliderContainer, {
  range: {
    min: SLIDER_DEFAULT_MIN,
    max: SLIDER_DEFAULT_MAX,
  },
  start: SLIDER_DEFAULT_START,
  step: SLIDER_DEFAULT_STEP,
  connect: 'lower'
});

for (const effectInput of effectsRadioInputs) {
  effectInput.addEventListener('change', (evt) => {
    imageUploadEffectLevelFieldset.classList.remove('hidden');
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: parseFloat(evt.target.dataset.min),
        max: parseFloat(evt.target.dataset.max)
      },
      start: parseFloat(evt.target.dataset.max),
      step: parseFloat(evt.target.dataset.step),
      format: {
        to: (value) => Number.isInteger(Number(value.toFixed(1))) ? value.toFixed(0) : value.toFixed(1),
        from: (value) => parseFloat(value)
      }
    });

    effectSliderContainer.noUiSlider.on('update', () => {
      imagePreview.style.filter = `${effectInput.dataset.effect}(${effectSliderContainer.noUiSlider.get()}${effectInput.dataset.measure})`;
      effectLevelValue.value = effectSliderContainer.noUiSlider.get();
    });
  });
}

effectOriginal.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imagePreview.style.filter = 'none';
    imageUploadEffectLevelFieldset.classList.add('hidden');
    effectLevelValue.value = '';
  }
});
