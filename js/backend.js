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

  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  // xhr.addEventListener(`load`, function () {
  //     let serverData = xhr.response;
  //     return serverData;
  // });

  xhr.open(`GET`, LOAD_URL, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.response);
      const cardsList = xhr.response;
      // return serverData;
    }
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
    getData: () => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      // xhr.addEventListener(`load`, function () {
      //     let serverData = xhr.response;
      //     return serverData;
      // });

      xhr.open(`GET`, LOAD_URL);
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(xhr.response);
          let serverData = xhr.response;
          return serverData;
        }
      };

    },
    cardsList,
  };

})();
