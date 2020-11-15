'use strict';

(() => {

  const filterForm = document.querySelector(`.map__filters`);
  const elements = filterForm.elements;
  const typeSelect = filterForm.querySelector(`#housing-type`);
  const roomSelect = filterForm.querySelector(`#housing-rooms`);
  const priceSelect = filterForm.querySelector(`#housing-price`);
  const guestSelect = filterForm.querySelector(`#housing-guests`);
  const featuresSet = filterForm.querySelector(`#housing-features`);
  const featuresList = featuresSet.querySelectorAll(`input`);

  const typeFilter = (arr) => {
    let filtered = arr;
    if (typeSelect.value !== `any`) {
      filtered = arr.filter(function (item) {
        return item.offer.type === typeSelect.value;
      });
    }
    return filtered;
  };

  const priceFilter = (arr) => {
    let filtered = [];

    switch (priceSelect.value) {
      case `any`:
        filtered = arr;
        break;
      case `low`:
        filtered = arr.filter(function (item) {
          return item.offer.price < 10000;
        });
        break;
      case `high`:
        filtered = arr.filter(function (item) {
          return item.offer.price > 50000;
        });
        break;
      case `middle`:
        filtered = arr.filter(function (item) {
          return item.offer.price <= 50000 && item.offer.price >= 10000;
        });
        break;
    }

    return filtered;
  };

  const roomsFilter = (arr) => {
    let filtered = arr;
    if (roomSelect.value !== `any`) {
      filtered = arr.filter(function (item) {
        return item.offer.rooms === parseInt(roomSelect.value, 10);
      });
    }
    return filtered;
  };

  const guestsFilter = (arr) => {
    let filtered = arr;
    if (guestSelect.value === `any`) {
      filtered = arr.filter(function (item) {
        return item.offer.guests !== 0;
      });
    } else {
      filtered = arr.filter(function (item) {
        return item.offer.guests === parseInt(guestSelect.value, 10);
      });
    }
    return filtered;
  };

  const featuresFilter = (arr) => {
    let filtered = arr;
    for (let i = 0; i < featuresList.length; i++) {
      if (featuresList[i].checked) {
        filtered = filtered.filter(function (item) {
          return window.util.checkAvailability(item.offer.features, featuresList[i].value);
        });
      }
    }
    return filtered;
  };

  const applyFilters = (arr) => {
    let filtered = arr;
    if (typeSelect.value !== `any`) {
      filtered = typeFilter(filtered);
    }
    if (roomSelect.value !== `any`) {
      filtered = roomsFilter(filtered);
    }
    filtered = guestsFilter(filtered);
    if (priceSelect.value !== `any`) {
      filtered = priceFilter(filtered);
    }
    filtered = featuresFilter(filtered);
    return filtered;
  };

  const disableFilterForm = () => {
    filterForm.classList.add(`visually-hidden`);
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = true;
    }
  };

  const enableFilterForm = () => {
    filterForm.classList.remove(`visually-hidden`);
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = false;
    }
  };

  window.filters = {
    applyFilters,
    disableFilterForm,
    enableFilterForm,
  };

})();
