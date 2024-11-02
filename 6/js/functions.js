//Проверка строки на максимальную длину
const isMaxLength = function (currentString, maxLength) {
  return currentString.length <= maxLength;
};
isMaxLength('Что-то на программистском', 20);

//Проверка, является ли строка полиндромом
const isPolindrom = function(currentString) {
  const currentStringReady = currentString.toLowerCase().replace(/ /g, '');
  const reverseString = currentStringReady.split('').reverse().join('');
  return currentStringReady === reverseString;
};
isPolindrom('топот');

//Склеивание цифр в одно число
const mergeNumbers = function(currentString) {
  const currentStringReady = typeof(currentString) === 'number' ? String(currentString) : currentString.replace(/ /g, '');

  let finishedNumber = '';
  for (let i = 0; i <= currentStringReady.length; i++) {
    if (!isNaN(Number(currentStringReady[i]))) {
      finishedNumber += currentStringReady[i];
    }
  }
  return finishedNumber === '' ? NaN : Number(finishedNumber);
};
mergeNumbers('Столетняя война длилась 116 лет, а не 100, как считают многие');
