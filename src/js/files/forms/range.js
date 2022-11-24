// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss
// в файле scss/forms/forms.scss

// Подключение cтилей из node_modules
import 'nouislider/dist/nouislider.css';

export function rangeInit() {
  const priceRange = document.querySelector('[data-range]');
  if (priceRange) {
    const textFrom = priceRange.querySelector('[data-range-from]');
    const textTo = priceRange.querySelector('[data-range-to]');
    let item = priceRange.querySelector('[data-range-item]');
    noUiSlider.create(item, {
      start: [Number(textFrom.value), Number(textTo.value)],
			connect: true,
      tooltips: [true, true],
      format: {
        from: function(value) {
                return parseInt(value);
            },
        to: function(value) {
                return parseInt(value);
            }
      },
			range: {
				'min': [Number(textFrom.dataset.rangeFrom)],
				'max': [Number(textTo.dataset.rangeTo)]
			}
    });
    const snapValues = [
      textFrom,
      textTo
    ];
    item.noUiSlider.on('update', function (values, handle) {
      snapValues[handle].value = values[handle];
  });
  }


}
rangeInit();

