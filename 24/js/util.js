const getRandomNumber = function(min, max) {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getRandomId (min, max) {
  const usedIds = [];

  return function() {
    let currentId = getRandomNumber(min, max);
    while (usedIds.includes(currentId)) {
      currentId = getRandomNumber(min, max);
      if (usedIds.length >= (max - min + 1)) {
        return null;
      }
    }
    usedIds.push(currentId);
    return currentId;
  };
}

const getRandomArrayIndex = function(currentArray) {
  return getRandomNumber(0, currentArray.length - 1);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const openSomeModal = (currentElement, onEscape) => {
  currentElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscape);
};

const closeSomeModal = (currentElement, onEscape) => {
  currentElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscape);
};

const sortArrayRandom = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomNumber, getRandomId, getRandomArrayIndex, isEscapeKey, openSomeModal, closeSomeModal, sortArrayRandom, debounce };
