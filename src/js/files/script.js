// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import Choices from 'choices.js'
//import { template } from "gulp-util";

import JustValidate from 'just-validate';


const element = document.querySelector('.select-region');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: ''
});

//spoller

document.addEventListener("click", function(e) {
  //закоментирована собственная реализация споллера
  /* const activeLink = document.querySelector('._spoller-active');
  const activeList = document.querySelector('._active');
  if(e.target.closest(".spollers__title")) {
    e.target.classList.toggle("_spoller-active");
    e.target.nextElementSibling.classList.toggle("_active");
    e.preventDefault();

    if(activeLink) {
      activeLink.classList.remove("_spoller-active");
      activeList.classList.remove("_active");
    }
  }else{
    if(activeLink){
      activeLink.classList.remove("_spoller-active");
      activeList.classList.remove("_active");
    }
  }*/

  //переключение страниц каталога
  const targetElement = e.target;
  if (e.target.closest('.hight-rating__show-more')) {
    getProducts(targetElement);
    e.preventDefault();
  }

  const firstPage = document.querySelector('.main-catalog__list_first');
  const secondPage = document.querySelector('.main-catalog__list_second');
  const thirdPage = document.querySelector('.main-catalog__list_third');

  const firstButton = document.querySelector('.main-catalog__btn_first');
  const secondButton = document.querySelector('.main-catalog__btn_second');
  const thirdButton = document.querySelector('.main-catalog__btn_third');


  if (e.target.closest('[data-third]')) {
      thirdPage.style.display = "grid";
      secondPage.style.display = "none";
      firstPage.style.display = "none";
      thirdButton.classList.add('active');
      firstButton.classList.remove('active');
      secondButton.classList.remove('active');
      e.preventDefault();
    }
  if (e.target.closest('[data-second]')) {
    secondPage.style.display = "grid";
    firstPage.style.display = "none";
    thirdPage.style.display = "none";
    thirdButton.classList.remove('active');
    firstButton.classList.remove('active');
    secondButton.classList.add('active');
    e.preventDefault();
  }
  if (e.target.closest('[data-first]')) {
    firstPage.style.display = "grid";
    secondPage.style.display = "none";
    thirdPage.style.display = "none";
    firstButton.classList.add('active');
    secondButton.classList.remove('active');
    thirdButton.classList.remove('active');
    e.preventDefault();
  }
})

//Load More Products
async function getProducts(button) {
  if (!button.classList.contains('_hold')) {
    button.classList.add('_hold');
    const file = "files/products.json";
    let response = await fetch(file, {
      method: "GET"
    });
    if(response.ok) {
      let result = await response.json();
      loadProducts(result);
      button.classList.remove('_hold');
      button.remove();
    }else{
      alert ("Ошибка");
    }
  }
}

function loadProducts(data) {
  const productsItems = document.querySelector('.hight-rating__list');

  data.products.forEach(item => {
    const productId = item.id;
    const productUrl = item.url;
    const productRating = item.rating;
    const productProductUrl = item.productUrl;
    const productImage = item.image;
    const productTitle = item.title;
    const productPrice = item.price;

    let template = `
      <article data-pid="${productId}" href="${productUrl}" class="hight-rating__item item-rating">
        <div class="item-rating__rating">
          <img class="item-rating__rating-star" src="img/hightRating/rating.svg" alt="Звезда">
          <p class="item-rating__rating-value">${productRating}</p>
        </div>
        <a href="${productProductUrl}" class="item-rating__img-wrap">
          <img class="item-rating__image" src="img/hightRating/${productImage}" alt="${productTitle}">
        </a>
        <h3 class="item-rating__title">${productTitle}</h3>
        <p class="item-rating__price">${productPrice}</p>
        <button class="item-rating__btn btn-light">Купить</button>
      </article>`

      productsItems.insertAdjacentHTML('beforeend', template);
  });
}

var input = document.querySelector('.bottom-header__input');
var btnSubmit = document.querySelector('.bottom-header__btn');
btnSubmit.setAttribute('disabled', true);

input.oninput = function(){
  let inputVal = document.querySelector('.bottom-header__input').value;
  if (inputVal!=0){
    btnSubmit.setAttribute('disabled', false);
  }else{
    btnSubmit.setAttribute('disabled', true);
  }
}

if(document.querySelector('#form')){
  const validate = new JustValidate('#form');

  const selectorTell = document.querySelector('input[type="tel"]');

  validate
    .addField('#name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Мало символов',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Много символов',
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя',
      }
    ])
    .addField('#phone', [
      {
        validator: (value) => {
          const phone = selectorTell.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
        errorMessage: 'Введите корректный номер',
      },
    ])
    .addField('#feedBackCheck', [
      {
        rule: 'required'
      },
    ])
    .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Введите email!',
        },
        {
          rule: 'email',
          errorMessage: 'Некорректный email!',
        },
    ]);
}

/* const form = document.getElementById('form');
if(form) {
  form.addEventListener("submit", formSend);
}


async function formSend(e) {
  e.preventDefault();
  const popupRecall = document.getElementById('popup-recall');
  popupRecall.classList.add('_active');
} */






//валидация формы в попапе с особенностями из-за того,
//что при нажатии на кнопку Отправить должен открыться следующий попап


const formPopup = document.getElementById('form-popup');

//formPopup.addEventListener('submit', formPopupSend);


//const itemsPopup = formPopup.querySelectorAll('._req');

function formValidate() {
  let error = 0;

  for(let i = 0; i < itemsPopup.length; i++) {
    formRemoveError(itemsPopup[i]);
    if(itemsPopup[i].classList.contains('_phone')) {
      const phone = itemsPopup[i].inputmask.unmaskedvalue();
      if(phone.length != 10) {
        formAddError(itemsPopup[i]);
        itemsPopup[i].insertAdjacentHTML('beforebegin', `<div>Заполните поле</div>`);
        error++;
      }
    }else if(itemsPopup[i].classList.contains('_email')) {
      if(emailTest(itemsPopup[i])) {
        formAddError(itemsPopup[i]);
        error++;
      }
    }else if(itemsPopup[i].getAttribute("type") === "checkbox" && itemsPopup[i].checked === false) {
      formAddError(itemsPopup[i]);
      itemsPopup[i].insertAdjacentHTML('beforebegin', `<div>Заполните поле</div>`);
        error++;
    }else {
      if(itemsPopup[i].value === '') {
        formAddError(itemsPopup[i]);
        itemsPopup[i].insertAdjacentHTML('beforebegin', `<div>Заполните поле</div>`);
        error++;
      }
    }
  }

  return error;
}

function formAddError(input) {
  input.parentElement.classList.add('_error');
  input.classList.add('_error');
}

function formRemoveError(input) {
  input.parentElement.classList.remove('_error');
  input.classList.remove('_error');
  if(input.previousSibling) {
    input.previousSibling.remove();
  }
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}







