'use strict';

(() => {

  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const address = form.querySelector(`#address`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const filterForm = document.querySelector(`.map__filters`);

  const setAddress = () => {
    if (map.classList.contains(`map--faded`)) {
      address.value = `601, 450`;
      mainPin.style = `left: 570px; top: 375px;`;
    } else {
      address.value = `601, 459`;
    }
  };

  const activateMap = () => {
    map.classList.remove(`map--faded`);
    if (!map.querySelector(`.map__card`)) {
      window.render.renderPins();
    }
    setAddress();
  };

  const deactivateMap = () => {
    map.classList.add(`map--faded`);
    window.render.deletePins();
    setAddress();
    filterForm.reset();
  };

  window.mapPins = {
    activateMap,
    deactivateMap,
  };

})();
