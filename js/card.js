'use strict';

(() => {

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

  const map = document.querySelector(`.map`);

  const hideCard = () => {
    if (map.querySelector(`.map__card`)) {
      let cardToHide = map.querySelector(`.map__card`);
      document.removeEventListener(`keydown`, onEscHideCard);
      map.removeChild(cardToHide);
    }
  };

  const onEscHideCard = (evt) => {
    if (map.querySelector(`.map__card`) && evt.key === `Escape`) {
      hideCard();
    }
  };

  const checkData = (data, element, property = `textContent`, text) => {
    text = typeof text !== `undefined` ? text : data;

    if (window.util.findData(data) === true) {
      window.util.addData(text, element, property);
    } else {
      window.util.hideElement(element);
    }
  };

  const checkCapacity = (rooms, guests, element) => {
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

  const checkTime = (checkin, checkout, element) => {
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

  const makePhotosList = (data) => {
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

  const fillCard = (object) => {
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

    if (!window.util.findData(object.offer.features) === true) {
      window.util.hideElement(cardElement.querySelector(`.popup__features`));
    } else {
      for (let i = 0; i < CONVENIENCE.length; i++) {
        if (!object.offer.features.includes(CONVENIENCE[i])) {
          window.util.hideElement(cardElement.querySelector(`.popup__feature--${CONVENIENCE[i]}`));
        }
      }
    }

    const photosList = cardElement.querySelector(`.popup__photos`);
    const templateImg = photosList.querySelector(`.popup__photo`);
    photosList.removeChild(templateImg);
    if (!window.util.findData(object.offer.photos) === true) {
      window.util.hideElement(photosList);
    } else {
      photosList.appendChild(makePhotosList(object.offer.photos));
    }

    return cardElement;
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

  window.card = {
    newCard,
    hideCard,
  };

})();
