'use strict';

(() => {

  const handleAvatarSelect = (evt) => {
    const file = evt.target.files;
    const f = file[0];
    const reader = new FileReader();
    reader.onload = (function () {
      return function (e) {
        const previewContainer = document.querySelector(`.ad-form-header__preview`);
        const preview = previewContainer.querySelector(`img`);
        preview.src = e.target.result;
        preview.width = `70`;
        preview.height = `70`;
        previewContainer.style = `padding: 0;`;
      };
    })(f);
    reader.readAsDataURL(f);
  };

  const handleFileSelect = (evt) => {
    const files = evt.target.files; // FileList object
    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      let reader = new FileReader();
      reader.onload = (function () {
        return function (e) {
          let newImg = document.createElement(`img`);
          newImg.src = e.target.result;
          newImg.width = `70`;
          newImg.height = `70`;
          newImg.alt = `Фотография жилья`;
          document.querySelector(`.ad-form__photo`).appendChild(newImg);
        };
      })(f);
      reader.readAsDataURL(f);
    }
  };

  document.querySelector(`#avatar`).addEventListener(`change`, handleAvatarSelect, false);
  document.querySelector(`#images`).addEventListener(`change`, handleFileSelect, false);

  window.formPreview = {
    handleAvatarSelect,
  };

})();
