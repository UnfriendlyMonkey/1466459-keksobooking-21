'use strict';

(() => {

  const handleAvatarSelect = (evt) => {
    const file = evt.target.files; // FileList object
    const f = file[0];
    // Only process image files.
    // if (!f.type.match('image.*')) {
    //     alert("Image only please....");
    // }
    const reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function () {
      return function (e) {
        // Render thumbnail.
        const previewContainer = document.querySelector(`.ad-form-header__preview`);
        const preview = previewContainer.querySelector(`img`);
        preview.src = e.target.result;
        preview.width = `70`;
        preview.height = `70`;
        previewContainer.style = `padding: 0;`;
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  };

  const handleFileSelect = (evt) => {
    const files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0; i < files.length; i++) {
      // Only process image files.
      // if (!f.type.match('image.*')) {
      //     alert("Image only please....");
      // }
      let f = files[i];
      let reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function () {
        return function (e) {
          // Render thumbnail.
          let newImg = document.createElement(`img`);
          newImg.src = e.target.result;
          newImg.width = `70`;
          newImg.height = `70`;
          newImg.alt = `Фотография жилья`;
          document.querySelector(`.ad-form__photo`).appendChild(newImg);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  };

  document.querySelector(`#avatar`).addEventListener(`change`, handleAvatarSelect, false);
  document.querySelector(`#images`).addEventListener(`change`, handleFileSelect, false);

  window.formPreview = {
    handleAvatarSelect,
  };

})();
