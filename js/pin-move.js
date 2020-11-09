'use strict';

(function () {

  const X_SHIFT = 31;
  const Y_SHIFT = 84;

  const borders = {
    minX: -33,
    maxX: 1167,
    minY: 115,
    maxY: 615,
  };

  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const address = form.querySelector(`#address`);

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      let newStyleCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y,
      };

      if (newStyleCoords.x < borders.minX) {
        newStyleCoords.x = borders.minX;
      } else if (newStyleCoords.x > borders.maxX) {
        newStyleCoords.x = borders.maxX;
      }

      if (newStyleCoords.y < borders.minY) {
        newStyleCoords.y = borders.minY;
      } else if (newStyleCoords.y > borders.maxY) {
        newStyleCoords.y = borders.maxY;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = `${newStyleCoords.y}px`;
      mainPin.style.left = `${newStyleCoords.x}px`;

      address.value = `${newStyleCoords.x + X_SHIFT}, ${newStyleCoords.y + Y_SHIFT}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
