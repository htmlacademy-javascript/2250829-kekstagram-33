//Проверка строки на максимальную длину
const isMaxLength = function (currentString, maxLength) {
  return currentString.length <= maxLength;
};
isMaxLength('Что-то на программистском', 20);

//Проверка, является ли строка полиндромом
const isPolindrom = function(currentString) {
  const currentStringReady = currentString.toLowerCase().replace(/ /g, '');
  let reverseString = '';
  for (let i = currentStringReady.length - 1; i >= 0; i--) {
    reverseString += currentStringReady.at(i);
  }
  return currentStringReady === reverseString;
};
isPolindrom('топот');

//Склеивание цифр в одно число
const mergeNumbers = function(currentString) {
  let currentStringReady;
  if (typeof(currentString) === 'number') {
    currentStringReady = String(currentString);
  } else {
    currentStringReady = currentString.replace(/ /g, '');
  }
  let finishedNumber = '';
  for (let i = 0; i <= currentStringReady.length; i++) {
    if (!isNaN(Number(currentStringReady[i]))) {
      finishedNumber += currentStringReady[i];
    }
  }
  return finishedNumber === '' ? NaN : Number(finishedNumber);
};
mergeNumbers('Столетняя война длилась 116 лет, а не 100, как считают многие');
