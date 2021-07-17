const contactsButton = document.querySelector('.contacts__button');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close-button');
const usernameInput = popup.querySelector('.popup__username-input');
const form = popup.querySelector('.popup__form');
const emailInput = popup.querySelector('.popup__email-input');
const mapPopup = document.querySelector('.map-popup');
const mapPopupButton = document.querySelector('.contacts__map-link');
const mapClose = mapPopup.querySelector('.map-popup__close-button')

let isStorageSupport = true;
let storage = "";

try {
  storageLogin = localStorage.getItem("username");
  storageEmail = localStorage.getItem('userEmail');
} catch (err) {
  isStorageSupport = false;
}

contactsButton.addEventListener('click', function() {
  popup.classList.add('show');

  if (storage) {
    usernameInput.value = storageLogin;
    emailInput.value = storageEmail;
  } else {
    usernameInput.focus();
  }
});

mapPopupButton.addEventListener('click', function () {
  mapPopup.classList.add('show');
})

popupClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('show');
  popup.classList.remove('error');
});

mapClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove('show');
})

form.addEventListener('submit', function(evt) {
  if (!usernameInput.value|| !emailInput.value) {
    evt.preventDefault();
    popup.classList.remove('error');
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add('error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem("username", usernameInput.value);
      localStorage.setItem("userEmail", emailInput.value);
    }  
  }
})

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("show")) {
      evt.preventDefault();
      popup.classList.remove("show");
      popup.classList.remove("error");
    }
  }
});
