'use strict';

(() => {

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const main = document.querySelector(`main`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const formReset = form.querySelector(`.ad-form__reset`);

  const roomInput = form.querySelector(`#room_number`);
  const guestInput = form.querySelector(`#capacity`);
  const typeInput = form.querySelector(`#type`);
  const priceInput = form.querySelector(`#price`);
  const titleInput = form.querySelector(`#title`);
  const timeinInput = form.querySelector(`#timein`);
  const timeoutInput = form.querySelector(`#timeout`);

  const images = form.querySelector(`.ad-form__photo`);

  const compareGuestsToRooms = () => {
    if (roomInput.value === `100` && guestInput.value !== `0`) {
      guestInput.setCustomValidity(`Этот вариант не для гостей`);
      guestInput.style.border = `2px solid red`;
    } else if (roomInput.value !== `100` && guestInput.value > roomInput.value) {
      guestInput.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
      guestInput.style.border = `2px solid red`;
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
      priceInput.style.border = `2px solid red`;
    } else {
      priceInput.setCustomValidity(``);
      priceInput.removeAttribute(`style`);
    }
    priceInput.reportValidity();
  };

  const checkTitleLength = (titleLength) => {
    if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} символов`);
      titleInput.style.border = `2px solid red`;
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} символов`);
      titleInput.style.border = `2px solid red`;
    } else {
      titleInput.setCustomValidity(``);
      titleInput.removeAttribute(`style`);
    }
    titleInput.reportValidity();
  };

  const addFormValidation = () => {
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

    titleInput.addEventListener(`change`, () => {
      checkTitleLength(titleInput.value.length);
    });

    timeinInput.addEventListener(`change`, () => {
      timeoutInput.value = timeinInput.value;
    });

    timeoutInput.addEventListener(`change`, () => {
      timeinInput.value = timeoutInput.value;
    });
  };

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

  const showSuccessPopup = () => {
    const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successPopup = successTemplate.cloneNode(true);
    main.appendChild(successPopup);
    document.addEventListener(`click`, removeSuccessPopup);
    document.addEventListener(`keydown`, onEscHideSuccess);
  };

  const onEscHideSuccess = (evt) => {
    if (evt.key === `Escape`) {
      removeSuccessPopup();
    }
  };

  const removeSuccessPopup = () => {
    main.removeChild(main.querySelector(`.success`));
    document.removeEventListener(`click`, removeSuccessPopup);
    document.removeEventListener(`keydown`, onEscHideSuccess);
  };

  const showErrorPopup = () => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorPopup = errorTemplate.cloneNode(true);
    main.appendChild(errorPopup);
    document.addEventListener(`click`, removeErrorPopup);
    document.addEventListener(`keydown`, onEscHideError);
  };

  const onEscHideError = (evt) => {
    if (evt.key === `Escape`) {
      removeErrorPopup();
    }
  };

  const removeErrorPopup = () => {
    main.removeChild(main.querySelector(`.error`));
    document.removeEventListener(`click`, removeErrorPopup);
    document.removeEventListener(`keydown`, onEscHideSuccess);
  };

  const successHandler = () => {
    showSuccessPopup();
    window.form.deactivateForm();
    window.mapPins.deactivateMap();
  };

  const errorHandler = () => {
    showErrorPopup();
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    checkTitleLength();
    compareTypeToPrice();
    compareGuestsToRooms();
    window.backend.save(new FormData(form), successHandler, errorHandler);
  };

  const onFormReset = () => {
    window.form.deactivateForm();
    window.mapPins.deactivateMap();
  };

  const deletePreviews = () => {
    if (images.children) {
      let image = images.querySelectorAll(`img`);
      for (let i = images.children.length - 1; i >= 0; i--) {
        images.removeChild(image[i]);
      }
    }
  };

  window.form = {
    activateForm: () => {
      form.classList.remove(`ad-form--disabled`);
      enableFields();
      addFormValidation();
      form.addEventListener(`submit`, submitHandler);
      formReset.addEventListener(`click`, onFormReset);
    },
    deactivateForm: () => {
      form.removeEventListener(`submit`, submitHandler);
      formReset.removeEventListener(`click`, onFormReset);
      form.reset();
      deletePreviews();
      form.classList.add(`ad-form--disabled`);
      disableFields();
    },
  };

})();
