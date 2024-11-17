import { isEscapeKey } from './util.js';

const successfulSendingMessageTemplate = document.querySelector('#success');
const successfulSendingMessageInf = successfulSendingMessageTemplate.content.querySelector('.success');
const successButton = successfulSendingMessageTemplate.content.querySelector('.success__button');
const errorSendingMessageTemplate = document.querySelector('#error');
const errorSendingMessageInf = errorSendingMessageTemplate.content.querySelector('.error');
const errorButton = errorSendingMessageTemplate.content.querySelector('.error__button');
const dataErrorTemplate = document.querySelector('#data-error');
const dataErrorInf = dataErrorTemplate.content.querySelector('.data-error');

const onMessageKeyDown = (currentElement, onClose) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(currentElement, onClose);
  }
};

const onArbitaryRegionClick = (currentElement, onClose) => (evt) => {
  if (!currentElement.children[0].contains(evt.target)) {
    closeMessage(currentElement, onClose);
  }
};

let onMessageKeyDownCallback;
let onArbitaryRegionClickCallback;

const openMessage = (currentMessage, onClose) => {
  onMessageKeyDownCallback = onMessageKeyDown(currentMessage, onClose);
  onArbitaryRegionClickCallback = onArbitaryRegionClick(currentMessage, onClose);
  document.body.append(currentMessage);
  document.addEventListener('keydown', onMessageKeyDownCallback);
  document.addEventListener('click', onArbitaryRegionClickCallback);
};

function closeMessage (currentMessage, onClose) {
  currentMessage.remove();
  onClose();
  document.removeEventListener('keydown', onMessageKeyDownCallback);
  document.removeEventListener('click', onArbitaryRegionClickCallback);
}

const openSuccessfulSendingMessage = () => {
  openMessage(successfulSendingMessageInf);

  successButton.addEventListener('click', () => {
    closeMessage(successfulSendingMessageInf);
  });
};

const openErrorSendingMessage = (onClose) => {
  openMessage(errorSendingMessageInf, onClose);

  errorButton.addEventListener('click', () => {
    closeMessage(errorSendingMessageInf, onClose);
  });
};

const openDataError = () => {
  document.body.append(dataErrorInf);

  setTimeout(() => {
    dataErrorInf.remove();
  }, 5000);
};

export { openSuccessfulSendingMessage, openErrorSendingMessage, openDataError };
