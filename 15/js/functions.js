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
mergeNumbers('Столетняя война длилась 116 лет, а не 100, как считают многие.');

//Проверка, не выходит ли встреча за рамки рабочего дня
const checkIfMeetingAbroadWorkDay = function (dayStartTime, dayEndTime, meetingStartTime, meetingLength) {
  const dayStartTimeFormat = dayStartTime.split(':');
  const dayEndTimeFormat = dayEndTime.split(':');
  const meetingStartTimeFormat = meetingStartTime.split(':');
  const dayStartInMinutes = Number(dayStartTimeFormat[0]) * 60 + Number(dayStartTimeFormat[1]);
  const dayEndInMinutes = Number(dayEndTimeFormat[0]) * 60 + Number(dayEndTimeFormat[1]);
  const meetingStartInMinutes = Number(meetingStartTimeFormat[0]) * 60 + Number(meetingStartTimeFormat[1]);

  if (dayEndInMinutes - dayStartInMinutes < 0) {
    return 'Такого рабочего дня быть не может';
  }

  return dayEndInMinutes - meetingStartInMinutes >= meetingLength && meetingStartInMinutes >= dayStartInMinutes;
};

export {checkIfMeetingAbroadWorkDay};
