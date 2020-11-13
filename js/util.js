'use strict';

(() => {

  window.util = {
    getRandomInt: (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomEl: (array) => {
      const rand = Math.floor(Math.random() * array.length);
      return array[rand];
    },

    getRandomArray: (array, count) => {
      let arrayCount = window.util.getRandomInt(1, count);
      let randomArray = [];
      for (let i = 0; i < arrayCount; i++) {
        randomArray[i] = window.util.getRandomEl(array);
      }
      return randomArray;
    },

    findData: (data) => {
      if (!data || data.length === 0) {
        return false;
      }
      return true;
    },

    addData: (data, element, property = `textContent`) => {
      element[property] = data;
    },

    hideElement: (element) => {
      element.classList.add(`visually-hidden`);
    },

    checkAvailability: (arr, val) => {
      return arr.some(function (arrVal) {
        return val === arrVal;
      });
    },

  };

})();
