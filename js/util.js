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
  };

})();