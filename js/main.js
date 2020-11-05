'use strict';

(() => {

  const map = document.querySelector(`.map`);
  const pinMain = map.querySelector(`.map__pin--main`);

  const activatePage = () => {
    window.mapPins.activateMap();
    window.form.activateForm();
  };

  const deactivatePage = () => {
    window.mapPins.deactivateMap();
    window.form.deactivateForm();
  };

  deactivatePage();

  pinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0 && map.classList.contains(`map--faded`)) {
      activatePage();
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  });

})();
