const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: ''
};

const load = (route, method = 'GET', body = null) => fetch(
  `${BASE_URL}${route}`,
  {method, body, }
)
  .then((response) => {
    if(!response.ok) {
      throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .catch((err) => {
    throw new Error(err.message);
  });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, 'POST', body);

export { getData, sendData };
