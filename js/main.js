const AUTHORS_NAMES = ['Василий', 'Федор', 'Иван', 'Кирилл', 'Артём', 'Анна', 'Светлана', 'Марина', 'Вероника', 'Ирина'];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const PHOTOS_DESCRIPTIONS = [
  'Величественные вершины, освещенные первыми лучами солнца, создают неповторимую атмосферу спокойствия и свободы.',
  'В воздухе витает тишина, а густой туман мягко окутывает деревья, превращая лес в сказочную тайну.',
  'Город оживает после заката — теплый свет уличных фонарей и неоновые вывески создают особое, магическое настроение.',
  'Тихий шорох волн и закатные краски — лучшее завершение долгого дня на берегу.',
  'Желтые листья у порога и аромат свежего кофе в воздухе — идеальное место для неспешного утреннего отдыха.',
  'Полные любопытства глаза и слегка наклоненная голова — эта собака точно знает, как завоевать ваше сердце.',
  'Цветущие луга и яркое солнце создают прекрасные условия для отдыха на природе в окружении друзей и вкусных угощений.',
  'Дух захватывает от свободного падения и широты открывающихся горизонтов — момент абсолютной свободы.',
  'Солнечные лучи пробиваются сквозь легкий туман над водой, а утки плывут, оставляя за собой спокойные волны.',
  'Ясное ночное небо, наполненное тысячами звезд, будто приглашает в бескрайние космические просторы.'
];
const PHOTOS_NUMBER = 25;

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

const createdPhotoId = getRandomId(1, PHOTOS_NUMBER);
const createdAuthorId = getRandomId(0, Number.MAX_SAFE_INTEGER);
const createdUrlId = getRandomId(1, PHOTOS_NUMBER);


const getRandomArrayIndex = function(currentArray) {
  return getRandomNumber(0, currentArray.length - 1);
};

const createComment = function() {
  return {
    id: createdAuthorId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: COMMENTS[getRandomArrayIndex(COMMENTS)],
    name: AUTHORS_NAMES[getRandomArrayIndex(AUTHORS_NAMES)]
  };
};

const createImageData = function() {
  return {
    id: createdPhotoId(),
    url: `photos/${createdUrlId()}.jpg`,
    description: PHOTOS_DESCRIPTIONS[getRandomArrayIndex(PHOTOS_DESCRIPTIONS)],
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 30)}, createComment)
  };
};

const similarImages = Array.from({length: PHOTOS_NUMBER}, createImageData); // eslint-disable-line
