const SCALE_VALUE_MIN_NUMBER = 25;
const SCALE_VALUE_STEP = 25;
const SCALE_VALUE_MAX_NUMBER = 100;
const PERCENTS_TO_SCALE = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const changeImageScale = (scaleValueNumber) => {
  scaleSmaller.addEventListener('click', () => {
    scaleValueNumber -= SCALE_VALUE_STEP;
    if (scaleValueNumber < SCALE_VALUE_MIN_NUMBER) {
      scaleValueNumber = SCALE_VALUE_MIN_NUMBER;
    }

    scaleValue.value = `${scaleValueNumber}%`;
    imagePreview.style.transform = `scale(${scaleValueNumber / PERCENTS_TO_SCALE})`;
  });

  scaleBigger.addEventListener('click', () => {
    scaleValueNumber += SCALE_VALUE_STEP;
    if (scaleValueNumber > SCALE_VALUE_MAX_NUMBER) {
      scaleValueNumber = SCALE_VALUE_MAX_NUMBER;
    }

    scaleValue.value = `${scaleValueNumber}%`;
    imagePreview.style.transform = `scale(${scaleValueNumber / PERCENTS_TO_SCALE})`;
  });
};

export {scaleValue, changeImageScale, imagePreview, SCALE_VALUE_MAX_NUMBER};
