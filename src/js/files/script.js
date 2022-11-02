// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import Choices from 'choices.js'
//import { template } from "gulp-util";

const element = document.querySelector('.select-region');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: ''
});

//spoller

document.addEventListener("click", function(e) {
  const activeLink = document.querySelector('._spoller-active');
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
  }

  const targetElement = e.target;
  if (e.target.closest('.hight-rating__show-more')) {
    getProducts(targetElement);
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







