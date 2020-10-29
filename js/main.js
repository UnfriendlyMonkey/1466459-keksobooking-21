'use strict';

const APARTMENT_TYPE = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

const TIME_CHOICE = [
  `12:00`,
  `13:00`,
  `14:00`
];

const CONVENIENCE = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const TITLES = [
  `1-комнатная квартира`,
  `Пентхаус 3 этажа`,
  `2-комнатная квартира`,
  `Лучшая цена на золотой миле`,
  `Свободная планировка`,
  `3-комнатная квартира`,
  `Апартаменты в центре`,
  `Дом в Подмосковье`,
  `Коттедж на Рублевке`,
  `Бунгало на Таити`,
  `Дворец. Просто дворец`
];

const DESCRIPTIONS = [
  `Curabitur sit amet auctor nibh. Praesent aliquam elit a tristique porta. Sed tempor mauris sit amet ex ultrices pulvinar. Nullam maximus et metus luctus volutpat. Nullam luctus elit vitae egestas consequat. Duis placerat porta quam eu ullamcorper. Nulla posuere efficitur enim id aliquet. Duis condimentum maximus nunc eu convallis. Morbi sodales metus eu ultrices lobortis.`,
  `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel suscipit lorem. Suspendisse posuere, nisi vitae consectetur suscipit, odio orci vehicula lacus, eget pretium magna purus eget enim. Morbi in est ac turpis mollis pellentesque sit amet et lacus.`,
  `Duis iaculis, sapien ut consequat varius, ipsum ex rutrum velit, id tristique quam ante et massa. Curabitur sit amet magna erat. Suspendisse magna diam, maximus et tincidunt et, malesuada sed nibh. In blandit rhoncus commodo. Vivamus urna ex, suscipit id viverra sit amet, tristique nec justo. Ut rhoncus placerat nulla, et ornare enim aliquet eget. Aenean gravida odio massa, et blandit dolor vehicula eget.`,
  `Nullam sit amet orci aliquam, feugiat massa ut, fermentum ipsum. Integer vestibulum metus at facilisis aliquet. Sed vitae feugiat dui. Nam eleifend fermentum porta. Nam at laoreet ante. Proin lorem lacus, ornare ac egestas a, ultricies a nisl. Sed venenatis luctus justo, ac sollicitudin velit consequat eget. Quisque sed mattis ante, a congue ante.`,
  `Sed lacus libero, ullamcorper sit amet scelerisque in, viverra at odio. Integer iaculis efficitur tortor ut laoreet. Nullam efficitur ligula ut ligula tempor aliquet. Etiam non diam non arcu vulputate auctor. Sed vel vulputate velit, eget lacinia justo. Aenean at eleifend eros, vitae euismod quam. Vestibulum sed justo sagittis lacus iaculis elementum id ac purus.`,
  `Fusce nec tempus erat. Aliquam non nulla semper, pretium sem in, fringilla purus. Suspendisse potenti. Aliquam nec mattis nisi, a lacinia lectus. Pellentesque maximus gravida dignissim. Nunc rhoncus maximus convallis. Aliquam porta, mauris sit amet molestie fringilla, purus augue aliquam purus, vel dignissim risus ipsum et dolor.`,
  `Nulla facilisi. Pellentesque ipsum nunc, consequat eu est nec, faucibus elementum massa. Mauris pharetra ornare urna fringilla mollis. Aenean non dictum sem. Nullam tincidunt dignissim mauris vitae consectetur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce accumsan, orci molestie bibendum vulputate, tortor nisl imperdiet risus, in aliquet ipsum urna at arcu. Pellentesque eu aliquet ligula. Fusce dolor augue, tincidunt at quam ut, rutrum ullamcorper tortor. In sed ante eget tortor tempor rhoncus a a enim.`,
  `Aliquam suscipit sit amet nisl at blandit. Phasellus pulvinar ligula quis metus ultrices, eget dignissim tortor porta. In vel tempor neque. Etiam nec nisi id purus vestibulum convallis at quis ante. Mauris et nibh eu velit aliquam efficitur sed ut nunc. Integer facilisis pretium ipsum eget feugiat. Cras ultrices est ac elit malesuada vulputate. Vivamus at sem eget augue pulvinar scelerisque. Donec sollicitudin sapien a velit sollicitudin, eu porttitor erat efficitur. In hac habitasse platea dictumst. Sed vel ex sit amet ipsum feugiat semper.`,
  `Nullam ac dui ex. Aliquam ullamcorper libero a quam tempor aliquam. Aenean sit amet enim non ante vulputate semper ac et lorem. Integer dignissim, ligula vel lobortis tincidunt, nisl nisl vulputate orci, ac accumsan purus lacus vitae augue. Etiam non tempor nibh. Suspendisse potenti. Morbi consequat risus eget iaculis tincidunt. Praesent eu finibus ligula. Aliquam non tincidunt arcu, et facilisis justo. Proin sed convallis lectus, vel consequat felis.`,
  `Nullam pellentesque facilisis lorem et imperdiet. Sed bibendum vitae velit id molestie. Integer eleifend laoreet massa quis mattis. Donec maximus lobortis sapien vitae auctor. In ac rhoncus urna, at tristique nulla. Aliquam non congue ex. Mauris sagittis dapibus sapien id porttitor.`
];

const IMG_LINKS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const PIN_X_SHIFT = 25;
const PIN_Y_SHIFT = 70;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const map = document.querySelector(`.map`);
const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const address = form.querySelector(`#address`);
const pinMain = map.querySelector(`.map__pin--main`);
const roomInput = form.querySelector(`#room_number`);
const guestInput = form.querySelector(`#capacity`);
const typeInput = form.querySelector(`#type`);
const priceInput = form.querySelector(`#price`);
const titleInput = form.querySelector(`#title`);

const enableFields = () => {
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute(`disabled`);
  }
};

const disableFields = () => {
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute(`disabled`, `disabled`);
  }
};

const activateForm = () => {
  form.classList.remove(`ad-form--disabled`);
  enableFields();
  compareGuestsToRooms();
};

const deactivateForm = () => {
  form.classList.add(`ad-form--disabled`);
  disableFields();
};

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
  // activateForm();
};

const deactivateMap = () => {
  map.classList.add(`map--faded`);
  setAddress();
  // deactivateForm();
};

const activatePage = () => {
  activateMap();
  activateForm();
  if (!map.querySelector(`.map__card`)) {
    renderPins();
  }
  newCard(cardsList[0]);
};

const deactivatePage = () => {
  deactivateMap();
  deactivateForm();
};

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomEl = function (array) {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

const getRandomArray = function (array, count) {
  let arrayCount = getRandomInt(1, count);
  let randomArray = [];
  for (let i = 0; i < arrayCount; i++) {
    randomArray[i] = getRandomEl(array);
  }
  return randomArray;
};

const makeRandomCard = function (count) {
  const randomCard = {
    author: {
      avatar: `img/avatars/user0` + count + `.png`,
    },
    location: {
      x: getRandomInt(0, 1201),
      y: getRandomInt(130, 631),
    },
    offer: {
      title: getRandomEl(TITLES),
      price: getRandomInt(2500, 25000),
      type: getRandomEl(Object.keys(APARTMENT_TYPE)),
      rooms: getRandomInt(1, 16),
      guests: getRandomInt(1, 26),
      checkin: getRandomEl(TIME_CHOICE),
      checkout: getRandomEl(TIME_CHOICE),
      description: getRandomEl(DESCRIPTIONS),
      features: getRandomArray(CONVENIENCE, 7),
      photos: getRandomArray(IMG_LINKS, 11),
    },
  };
  randomCard.offer.address = `${randomCard.location.x}, ${randomCard.location.y}`;

  return randomCard;
};

const makeCardsList = function (count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    list[i] = makeRandomCard(i + 1);
  }
  return list;
};

const cardsList = makeCardsList(8);

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

const compareGuestsToRooms = () => {
  if (roomInput.value === `100` && guestInput.value !== `0`) {
    guestInput.setCustomValidity(`Этот вариант не для гостей`);
    guestInput.style.background = `salmon`;
  } else if (roomInput.value !== `100` && guestInput.value > roomInput.value) {
    guestInput.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
    guestInput.style.background = `salmon`;
  } else {
    guestInput.setCustomValidity(``);
    guestInput.removeAttribute(`style`);
  }
};

const compareTypeToPrice = () => {
  if (typeInput.value === `palace`) {
    priceInput.min = `10000`;
    priceInput.placeholder = `10000`;
  } else if (typeInput.value === `house`) {
    priceInput.min = `5000`;
    priceInput.placeholder = `5000`;
  } else if (typeInput.value === `flat`) {
    priceInput.min = `1000`;
    priceInput.placeholder = `1000`;
  } else {
    priceInput.min = `0`;
    priceInput.placeholder = `0`;
  }
  if (priceInput.value < priceInput.min) {
    priceInput.setCustomValidity(`Цена за этот тип жилья не может быть меньше ${priceInput.min}руб/ночь`);
    priceInput.style.background = `salmon`;
  } else {
    priceInput.setCustomValidity(``);
    priceInput.removeAttribute(`style`);
  }
};

const checkTitleLength = (titleLength) => {
  if (titleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} символов`);
    titleInput.style.background = `salmon`;
  } else if (titleLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} символов`);
    titleInput.style.background = `salmon`;
  } else {
    titleInput.setCustomValidity(``);
    titleInput.removeAttribute(`style`);
  }
  titleInput.reportValidity();
}

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

guestInput.addEventListener(`change`, () => {
  compareGuestsToRooms();
});

roomInput.addEventListener(`change`, () => {
  compareGuestsToRooms();
});

typeInput.addEventListener(`change`, () => {
  compareTypeToPrice();
});

priceInput.addEventListener(`change`, () => {
  compareTypeToPrice();
});

titleInput.addEventListener(`input`, () => {
  checkTitleLength(titleInput.value.length);
  titleInput.reportValidity();
})
