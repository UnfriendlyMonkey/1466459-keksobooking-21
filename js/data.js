'use strict';

(() => {

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

  const makeRandomCard = function (count) {
    const randomCard = {
      author: {
        avatar: `img/avatars/user0` + count + `.png`,
      },
      location: {
        x: window.util.getRandomInt(0, 1201),
        y: window.util.getRandomInt(130, 631),
      },
      offer: {
        title: window.util.getRandomEl(TITLES),
        price: window.util.getRandomInt(2500, 25000),
        type: window.util.getRandomEl(Object.keys(APARTMENT_TYPE)),
        rooms: window.util.getRandomInt(1, 16),
        guests: window.util.getRandomInt(1, 26),
        checkin: window.util.getRandomEl(TIME_CHOICE),
        checkout: window.util.getRandomEl(TIME_CHOICE),
        description: window.util.getRandomEl(DESCRIPTIONS),
        features: window.util.getRandomArray(CONVENIENCE, 7),
        photos: window.util.getRandomArray(IMG_LINKS, 11),
      },
    };
    randomCard.offer.address = `${randomCard.location.x}, ${randomCard.location.y}`;

    return randomCard;
  };

  window.data = {
    makeCardsList: (count) => {
      const list = [];
      for (let i = 0; i < count; i++) {
        list[i] = makeRandomCard(i + 1);
      }
      return list;
    },
  };

})();