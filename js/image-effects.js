import { imagePreview } from './image-form.js';

const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectsRadioInputs = document.querySelectorAll('.effects__radio:not(#effect-none)');
const effectOriginal = document.querySelector('#effect-none');
const effectLevelValue = document.querySelector('.effect-level__value');

effectSliderContainer.style.display = 'none';

noUiSlider.create(effectSliderContainer, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

for (const effectInput of effectsRadioInputs) {
  effectInput.addEventListener('change', function() {
    effectSliderContainer.style.display = 'block';
    effectSliderContainer.noUiSlider.updateOptions({
      range: {
        min: parseFloat(this.dataset.min),
        max: parseFloat(this.dataset.max)
      },
      start: parseFloat(this.dataset.max),
      step: parseFloat(this.dataset.step)
      // format: {
      //   to: (value) => value.toFixed(1),
      //   from: (value) => parseFloat(value)
      // } Вопрос, нужно ли данное приведение?
    });

    // if (this.dataset.effect === 'invert') {
    //   effectSliderContainer.noUiSlider.updateOptions({
    //     format: {
    //       to: (value) => value.toFixed(0),
    //       from: (value) => parseFloat(value)
    //     }
    //   });
    // } Вопрос, нужно ли данное приведение?

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
