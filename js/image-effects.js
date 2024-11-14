import { imagePreview } from './image-form.js';

const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectsRadioInputs = document.querySelectorAll('.effects__radio:not(#effect-none)');
const effectOriginal = document.querySelector('#effect-none');
const effectLevelValue = document.querySelector('.effect-level__value');

const SLIDER_DEFAULT_MIN = 0;
const SLIDER_DEFAULT_MAX = 1;
const SLIDER_DEFAULT_START = 1;
const SLIDER_DEFAULT_STEP = 0.1;


effectSliderContainer.style.display = 'none';

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
    effectSliderContainer.style.display = 'block';
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: parseFloat(evt.target.dataset.min),
        max: parseFloat(evt.target.dataset.max)
      },
      start: parseFloat(evt.target.dataset.max),
      step: parseFloat(evt.target.dataset.step),
      format: {
        to: (value) => {
          switch (evt.target.dataset.effect) {
            case 'invert':
              return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: (value) => parseFloat(value)
      }
    });

    // switch (evt.target.dataset.effect) {
    //   case 'invert':
    //     effectSliderContainer.noUiSlider.updateOptions({
    //       format: {
    //         to: (value) => value.toFixed(0),
    //         from: (value) => parseFloat(value)
    //       }
    //     });
    // }


    effectSliderContainer.noUiSlider.on('update', () => {
      imagePreview.style.filter = `${effectInput.dataset.effect}(${effectSliderContainer.noUiSlider.get()}${effectInput.dataset.measure})`;
      effectLevelValue.value = effectSliderContainer.noUiSlider.get();
    });
  });
}

effectOriginal.addEventListener('click', () => {
  imagePreview.style.filter = 'none';
  effectSliderContainer.style.display = 'none';
  effectLevelValue.value = '';
});
