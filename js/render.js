'use strict';

(() => {

  const filterForm = document.querySelector(`.map__filters`);

  const PIN_X_SHIFT = 25;
  const PIN_Y_SHIFT = 70;

  const MAX_PINS_LIST = 5;

  const map = document.querySelector(`.map`);

  const findCardToShow = (evt) => {
    if (!evt.target.closest(`.map__pin`) || evt.target.closest(`.map__pin`).classList.contains(`map__pin--main`)) {
      return;
    }
    let activePin = evt.target.closest(`.map__pin`);
    let dataToShow = cardsList.filter(function (item) {
      return item.offer.title === activePin.querySelector(`img`).alt && activePin.style.left === `${item.location.x - PIN_X_SHIFT}px` && activePin.style.top === `${item.location.y - PIN_Y_SHIFT}px`;
    });
    window.card.newCard(dataToShow[0]);
  };


  const renderPin = (data) => {

    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let pinElement = pinTemplate.cloneNode(true);

    let pinX = data.location.x - PIN_X_SHIFT;
    let pinY = data.location.y - PIN_Y_SHIFT;

    pinElement.querySelector(`img`).src = data.author.avatar;
    pinElement.querySelector(`img`).alt = data.offer.title;
    pinElement.style = `left: ${pinX}px; top: ${pinY}px;`;

    return pinElement;
  };

  const makePinsList = (array) => {
    const fragment = document.createDocumentFragment();
    let count = array.length < MAX_PINS_LIST ? array.length : MAX_PINS_LIST;
    for (let i = 0; i < count; i++) {
      fragment.appendChild(renderPin(array[i]));
    }
    return fragment;
  };

  const deletePins = () => {
    window.card.hideCard();
    const mapPins = document.querySelector(`.map__pins`);
    const pins = mapPins.querySelectorAll(`.map__pin`);
    for (let i = pins.length - 1; i > 0; i--) {
      mapPins.removeChild(pins[i]);
    }
    map.removeEventListener(`click`, findCardToShow);
  };

  const renderPins = (arr) => {
    deletePins();
    if (!arr) {
      arr = cardsList;
    }
    const mapPins = document.querySelector(`.map__pins`);
    mapPins.appendChild(makePinsList(arr));
    map.addEventListener(`click`, findCardToShow);
  };

  let cardsList = [];

  const onDataLoad = (response) => {
    cardsList = response;
  };

  const errorHandler = (errorMessage) => {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onChangeFilter = () => {
    let filtered = window.filters.applyFilters(cardsList);
    renderPins(filtered);
  };

  window.backend.load(onDataLoad, errorHandler);

  filterForm.addEventListener(`change`, onChangeFilter);

  window.render = {
    renderPins,
    deletePins,
  };

})();
