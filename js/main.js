'use strict';

const APARTMENT_TYPE = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

const CONVENIENCE = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PIN_X_SHIFT = 25;
const PIN_Y_SHIFT = 70;

const map = document.querySelector(`.map`);
const form = document.querySelector(`.ad-form`);
const address = form.querySelector(`#address`);
const pinMain = map.querySelector(`.map__pin--main`);


const setAddress = () => {
  if (map.classList.contains(`map--faded`)) {
    address.value = `601, 450`;
  } else {
    address.value = `601, 459`;
  }
};

const activateMap = () => {
  map.classList.remove(`map--faded`);
  setAddress();
};

const deactivateMap = () => {
  map.classList.add(`map--faded`);
  setAddress();
};

const activatePage = () => {
  activateMap();
  window.form.activateForm();
  if (!map.querySelector(`.map__card`)) {
    renderPins();
  }
  newCard(cardsList[0]);
};

const deactivatePage = () => {
  deactivateMap();
  window.form.deactivateForm();
};

const cardsList = window.data.makeCardsList(8);

const renderPin = function (data) {

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let pinElement = pinTemplate.cloneNode(true);

  let pinX = data.location.x - PIN_X_SHIFT;
  let pinY = data.location.y - PIN_Y_SHIFT;

  pinElement.querySelector(`img`).src = data.author.avatar;
  pinElement.querySelector(`img`).alt = data.offer.title;
  pinElement.style = `left: ${pinX}px; top: ${pinY}px;`;

  return pinElement;
};

const makePinsList = function (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  return fragment;
};

const onEscHideCard = (evt) => {
  if (map.querySelector(`.map__card`) && evt.key === `Escape`) {
    let cardToHide = map.querySelector(`.map__card`);
    document.removeEventListener(`keydown`, onEscHideCard);
    map.removeChild(cardToHide);
  }
};

const newCard = (data) => {
  if (map.querySelector(`.map__card`)) {
    let cardToHide = map.querySelector(`.map__card`);
    document.removeEventListener(`keydown`, onEscHideCard);
    map.removeChild(cardToHide);
  }
  let cardToShow = fillCard(data);
  const referenceElement = map.querySelector(`.map__filters-container`);
  let cardCloseButton = cardToShow.querySelector(`.popup__close`);
  cardCloseButton.addEventListener(`click`, function () {
    document.removeEventListener(`keydown`, onEscHideCard);
    map.removeChild(cardToShow);
  });
  map.insertBefore(cardToShow, referenceElement);
  document.addEventListener(`keydown`, onEscHideCard);
};

const findCardToShow = (evt) => {
  if (!evt.target.closest(`.map__pin`) || evt.target.closest(`.map__pin`).classList.contains(`map__pin--main`)) {
    return;
  }
  let activePin = evt.target.closest(`.map__pin`);
  let dataToShow = cardsList.filter(function (item) {
    return item.offer.title === activePin.querySelector(`img`).alt && activePin.style.left === `${item.location.x - PIN_X_SHIFT}px` && activePin.style.top === `${item.location.y - PIN_Y_SHIFT}px`;
  });
  newCard(dataToShow[0]);
};

const renderPins = function () {
  const mapPins = document.querySelector(`.map__pins`);
  mapPins.appendChild(makePinsList(cardsList));
  map.addEventListener(`click`, findCardToShow);
};

const findData = function (data) {
  if (!data || data.length === 0) {
    return false;
  }
  return true;
};

const addData = function (data, element, property = `textContent`) {
  element[property] = data;
};

const hideElement = function (element) {
  element.classList.add(`visually-hidden`);
};

const checkData = function (data, element, property = `textContent`, text) {
  text = typeof text !== `undefined` ? text : data;

  if (findData(data) === true) {
    addData(text, element, property);
  } else {
    hideElement(element);
  }
};

const checkCapacity = function (rooms, guests, element) {
  let text = ``;
  if (rooms && guests) {
    text = `${rooms} комнаты для ${guests} гостей`;
  } else if (rooms) {
    text = `${rooms} комнаты`;
  } else if (guests) {
    text = `Для ${guests} гостей`;
  }
  checkData(text, element);
};

const checkTime = function (checkin, checkout, element) {
  let text = ``;
  if (checkin && checkout) {
    text = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else if (checkin) {
    text = `Заезд после ${checkin}`;
  } else if (checkout) {
    text = `Выезд до ${checkout}`;
  }
  checkData(text, element);
};

const makePhotosList = function (data) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    let newImage = document.createElement(`img`);
    newImage.src = data[i];
    newImage.classList.add(`popup__photo`);
    newImage.width = `45`;
    newImage.height = `40`;
    newImage.alt = `Фотография жилья`;
    fragment.appendChild(newImage);
  }
  return fragment;
};

const fillCard = function (object) {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  let cardElement = cardTemplate.cloneNode(true);

  checkData(object.author.avatar, cardElement.querySelector(`.popup__avatar`), `src`);

  checkData(object.offer.title, cardElement.querySelector(`.popup__title`));

  checkData(object.offer.address, cardElement.querySelector(`.popup__text--address`));

  checkData(object.offer.price, cardElement.querySelector(`.popup__text--price`), `innerHTML`, `${object.offer.price}&#x20bd;<span>/ночь</span>`);

  checkData(object.offer.type, cardElement.querySelector(`.popup__type`), `textContent`, APARTMENT_TYPE[object.offer.type]);

  checkCapacity(object.offer.rooms, object.offer.guests, cardElement.querySelector(`.popup__text--capacity`));

  checkTime(object.offer.checkin, object.offer.checkout, cardElement.querySelector(`.popup__text--time`));

  checkData(object.offer.description, cardElement.querySelector(`.popup__description`));

  if (!findData(object.offer.features) === true) {
    hideElement(cardElement.querySelector(`.popup__features`));
  } else {
    for (let i = 0; i < CONVENIENCE.length; i++) {
      if (!object.offer.features.includes(CONVENIENCE[i])) {
        hideElement(cardElement.querySelector(`.popup__feature--${CONVENIENCE[i]}`));
      }
    }
  }

  const photosList = cardElement.querySelector(`.popup__photos`);
  const templateImg = photosList.querySelector(`.popup__photo`);
  photosList.removeChild(templateImg);
  if (!findData(object.offer.photos) === true) {
    hideElement(photosList);
  } else {
    photosList.appendChild(makePhotosList(object.offer.photos));
  }

  return cardElement;
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
