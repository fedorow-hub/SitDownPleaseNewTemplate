/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, {Autoplay, Navigation, Pagination, EffectFade, Thumbs } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
//import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
//import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.hero__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.hero__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Autoplay, EffectFade, Pagination],
      allowTouchMove: false,
      loop: true,
      effect: 'fade',
      speed: 10000,
      autoplay: {
        delay: 1000
      },

			// Пагинация

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

		});
	}

  if (document.querySelector('.special__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.special__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 33,
			autoHeight: true,
			speed: 800,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper__button-prev',
				nextEl: '.swiper__button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 33,
					autoHeight: true,
				},
				680: {
					slidesPerView: 2,
					spaceBetween: 33,
				},
				992: {
					slidesPerView: 3,
          slidesPerGroup: 1,
					spaceBetween: 33
				},
				1268: {
					slidesPerView: "auto",
          slidesPerGroup: 3,
					spaceBetween: 33,
				},
			},

		});
	}

  if (document.querySelector('.useful__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.useful__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 32,
			autoHeight: true,
			speed: 800,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.useful__slider .swiper__button-prev',
				nextEl: '.useful__slider .swiper__button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 32,
					autoHeight: true,
				},
				680: {
					slidesPerView: 2,
					spaceBetween: 32,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 32
				},
				1268: {
					slidesPerView: 2,
					spaceBetween: 32,
				},
			},

		});
	}

  if (document.querySelector('.similar-product__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.similar-product__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			spaceBetween: 32,
			autoHeight: true,
			speed: 800,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.similar-product__button-prev ',
				nextEl: '.similar-product__button-next ',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 2,
					spaceBetween: 16,
					autoHeight: true,
				},
				680: {
					slidesPerView: 2,
					spaceBetween: 32,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 32
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 32,
				},
			},

		});
	}

  if (document.querySelector('.card__wripper-sliders')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
    const thumbsSwiper = new Swiper('.thumbs-images', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Thumbs],
			observer: true,
			observeParents: false,
			slidesPerView: 4,
			spaceBetween: 16,
			//autoHeight: true,
			speed: 800,
      direction: 'horizontal',
			loop: true,

			// Брейкпоинты

			breakpoints: {
        320: {
					direction: 'horizontal',
          slidesPerView: 2,
				},
        560: {
					direction: 'vertical'
				},
				769: {
					direction: 'horizontal'
				},
			},

		});
		new Swiper('.card__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Autoplay, Thumbs],
			observer: true,
			observeParents: false,
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 800,
			loop: true,

      thumbs: {
        swiper: thumbsSwiper
      },

		});
	}



}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
