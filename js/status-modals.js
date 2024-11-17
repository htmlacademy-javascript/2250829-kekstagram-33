import { isEscapeKey } from './util';

const successfulSendingMessageTemplate = document.querySelector('#success');
const successfulSendingMessageInf = successfulSendingMessageTemplate.content.querySelector('.success');
const successButton = successfulSendingMessageTemplate.content.querySelector('.success__button');
const errorSendingMessageTemplate = document.querySelector('#error');
const errorSendingMessageInf = errorSendingMessageTemplate.content.querySelector('.error');
const errorButton = successfulSendingMessageTemplate.content.querySelector('.error__button');
const dataErrorTemplate = document.querySelector('#data-error');
const dataErrorInf = dataErrorTemplate.content.querySelector('.data-error');

const onMessageKeyDown = (currentElement) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(currentElement);
  }
};

const onArbitaryRegionClick = (currentElement) => (evt) => {
  if (!currentElement.children[0].contains(evt.target)) {
    closeMessage(currentElement);
  }
};

let onMessageKeyDownCallback;
let onArbitaryRegionClickCallback;

const openMessage = (currentMessage) => {
  onMessageKeyDownCallback = onMessageKeyDown(currentMessage);
  onArbitaryRegionClickCallback = onArbitaryRegionClick(currentMessage);
  document.body.append(currentMessage);
  document.addEventListener('keydown', onMessageKeyDownCallback);
  document.addEventListener('click', onArbitaryRegionClickCallback);
};

function closeMessage (currentMessage) {
  currentMessage.remove();
  document.removeEventListener('keydown', onMessageKeyDownCallback);
  document.removeEventListener('click', onArbitaryRegionClickCallback);
}

const openSuccessfulSendingMessage = () => {
  openMessage(successfulSendingMessageInf);

  successButton.addEventListener('click', () => {
    closeMessage(successfulSendingMessageInf);
  });
};

const openErrorSendingMessage = () => {
  openMessage(errorSendingMessageInf);

  errorButton.addEventListener('click', () => {
    closeMessage(errorSendingMessageInf);
  });
};

const openDataError = () => {
  document.body.append(dataErrorInf);

  setTimeout(() => {
    dataErrorInf.remove();
  }, 5000);
};

export { openSuccessfulSendingMessage, openErrorSendingMessage, openDataError };
