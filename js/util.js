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


const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, openSomeModal, closeSomeModal, sortArrayRandom, debounce };
