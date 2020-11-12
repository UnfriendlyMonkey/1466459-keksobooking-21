'use strict';

(() => {

  const filterForm = document.querySelector(`.map__filters`);

  const typeFilter = (arr) => {
    const typeSelect = filterForm.querySelector(`#housing-type`);
    let filtered = arr;
    if (typeSelect.value !== `any`) {
      filtered = arr.filter(function (item) {
        return item.offer.type === typeSelect.value;
      });
    }
    return filtered;
  };

  const applyFilters = (arr) => {
    const filtered = typeFilter(arr);
    return filtered;
  };


  window.filters = {
    applyFilters,
    typeFilter,
  };

})();
