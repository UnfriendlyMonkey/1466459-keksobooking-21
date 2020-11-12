'use strict';

(() => {

  const filterForm = document.querySelector(`.map__filters`);
  // const selects = filterForm.querySelectorAll(`select`);
  const typeSelect = filterForm.querySelector(`#housing-type`);
  const roomSelect = filterForm.querySelector(`#housing-rooms`);
  const priceSelect = filterForm.querySelector(`#housing-price`);
  const guestSelect = filterForm.querySelector(`#housing-guests`);

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

    switch (priceFilter.value) {
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

    // if (priceFilter.value === `any`) {
    //   filtered = arr;
    // } else if (priceFilter.value === `low`) {
    //   filtered = arr.filter(function (item) {
    //     return item.offer.price < 10000;
    //   });
    // } else if (priceFilter.value === `high`) {
    //   filtered = arr.filter(function (item) {
    //     return item.offer.price > 50000;
    //   });
    // } else {
    //   filtered = arr.filter(function (item) {
    //     return item.offer.price <= 50000 && item.offer.price >= 10000;
    //   });
    // }
    return filtered;
  };

  const roomsFilter = (arr) => {
    let filtered = arr;
    if (roomSelect.value !== `any`) {
      filtered = arr.filter(function (item) {
        return item.offer.rooms == roomSelect.value;
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
        return item.offer.guests == guestSelect.value;
      });
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
    // if (priceSelect.value !== `any`) {
    //   filtered = priceFilter(filtered);
    // }
    return filtered;
  };


  window.filters = {
    applyFilters,
    typeFilter,
    roomsFilter,
    priceFilter,
  };

})();
