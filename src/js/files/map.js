const map = document.querySelector('#map');

if(map) {
  ymaps.ready(init);
  function init() {
    //const mapElem = document.querySelector('#map');
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.75484106897436,37.6232404999999],
        zoom: 14,
        controls: []

      },
      {
        suppressMapOpenBlock: true
      }
    );

    myMap.behaviors.disable('scrollZoom');

    // Создание макета балуна на основе Twitter Bootstrap.
    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="popover top">' +
        '<a class="close" href="#">&times;</a>' +
        '<div class="arrow"></div>' +
        '<div class="popover-inner">' +
          '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
        '</div>' +
      '</div>', {
      /**
        * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
        * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
        * @function
        * @name build
        */
      build: function () {
        this.constructor.superclass.build.call(this);

        this._element = this.getParentElement().querySelector('.popover');
        this._onCloseClick = this.onCloseClick.bind(this);

        this.applyElementOffset();

        this._element.querySelector('.close').addEventListener('click', this._onCloseClick);
      },

      /**
        * Удаляет содержимое макета из DOM.
        * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
        * @function
        * @name clear
        */
      clear: function () {
        this._element.querySelector('.close').removeEventListener('click', this._onClickClick);

        this.constructor.superclass.clear.call(this);
      },

      /**
        * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
        * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
        * @function
        * @name onSublayoutSizeChange
        */
      onSublayoutSizeChange: function () {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        if (!this._isElement(this._element)) {
          return;
        }

        this.applyElementOffset();

        this.events.fire('shapechange');
      },

      /**
        * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
        * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
        * @function
        * @name applyElementOffset
        */
      applyElementOffset: function () {
        Object.assign(this._element.style, {
          left: -(this._element.offsetWidth / 2) + 'px',
          top: -(this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight) + 'px'
        });
      },

      /**
        * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
        * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
        * @function
        * @name onCloseClick
        */
      onCloseClick: function (e) {
        e.preventDefault();

        this.events.fire('userclose');
      },

      /**
        * Используется для автопозиционирования (balloonAutoPan).
        * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
        * @function
        * @name getClientBounds
        * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
        */
      getShape: function () {
        if (!this._isElement(this._element)) {
          return MyBalloonLayout.superclass.getShape.call(this);
        }

        var style = getComputedStyle(this._element);
        var position = {
          left: parseFloat(style.left),
          top: parseFloat(style.top),
        };

        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
          [position.left, position.top], [
            position.left + this._element.offsetWidth,
            position.top + this._element.offsetHeight + this._element.querySelector('.arrow').offsetHeight
          ]
        ]));
      },

      /**
        * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
        * @function
        * @private
        * @name _isElement
        * @param {jQuery} [element] Элемент.
        * @returns {Boolean} Флаг наличия.
        */
      _isElement: function (element) {
        return element && element.querySelector('.arrow');
      }
    });


    // Создание вложенного макета содержимого балуна.
    const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
      '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
      '<div class="popover-content">$[properties.balloonContent]</div>'
    );

    const myPlacemark = window.myPlacemark = new ymaps.Placemark(
      [55.750615568993275,37.64180899999995],
      {
      balloonContent: `<div class="map-contacts__body">
      <h3 class="map-contacts__title">SitDownPls на Солянке</h3>
      <div class="map-contacts__address">м. Китай-город, ул. Солянка, д.24</div>
      <a class="map-contacts__phone" href="tel:+74958854547">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3425 14.0983C17.215 14.0983 16.1242 13.915 15.1067 13.585C14.7858 13.475 14.4283 13.5575 14.1808 13.805L12.7417 15.6108C10.1475 14.3733 7.71833 12.0358 6.42583 9.35L8.21333 7.82833C8.46083 7.57167 8.53417 7.21417 8.43333 6.89333C8.09417 5.87583 7.92 4.785 7.92 3.6575C7.92 3.1625 7.5075 2.75 7.0125 2.75H3.84083C3.34583 2.75 2.75 2.97 2.75 3.6575C2.75 12.1733 9.83583 19.25 18.3425 19.25C18.9933 19.25 19.25 18.6725 19.25 18.1683V15.0058C19.25 14.5108 18.8375 14.0983 18.3425 14.0983Z" fill="#FF862F"/>
        </svg>
        <span>+7(495)885-45-47</span>
      </a>
      <div class="map-contacts__hours-work">
        <span>Часы работы:</span> с 10:00 до 21:00
      </div>
      <div class="map-contacts__description">
        <span>Что здесь:</span>
        шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр
      </div>
    </div>`
    },
      {
      balloonShadow: false,
      balloonLayout: MyBalloonLayout,
      balloonContentLayout: MyBalloonContentLayout,
      balloonPanelMaxMapArea: 0,


      iconLayout: "default#image",
      iconImageHref: "img/icon/elefant.svg",
      iconImageSize: [32, 22],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    //myMap.container.fitToViewport();
  }
}

