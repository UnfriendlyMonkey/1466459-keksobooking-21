'use strict';

(() => {

  const SAVE_URL = `https://21.javascript.pages.academy/keksobooking`;
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;

  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_TIME = 1500;

  const createXhr = (onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_TIME;

    return xhr;
  };

  window.backend = {
    load: (onLoad, onError) => {
      let xhr = createXhr(onLoad, onError);

      xhr.open(`GET`, LOAD_URL);
      xhr.send();
    },
    save: (data, onLoad, onError) => {
      let xhr = createXhr(onLoad, onError);

      xhr.open(`POST`, SAVE_URL);
      xhr.send(data);
    },
  };

})();
