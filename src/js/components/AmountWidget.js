import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';

class AmountWidget extends BaseWidget {
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);
    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.value = settings.amountWidget.defaultValue;
    thisWidget.setValue(thisWidget.dom.input.value);
    console.log('thisWidget.value', thisWidget.value);
    thisWidget.initActions();

    console.log('amountwidget', thisWidget);
  }

  getElements() {
    const thisWidget = this;

    // thisWidget.element = element;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(
      select.widgets.amount.input
    );
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(
      select.widgets.amount.linkIncrease
    );
  }

  // setValue(value) {
  //   const thisWidget = this;

  //   const newValue = parseInt(value);

  //   // TODO: add validation
  //   if (
  //     thisWidget.value !== newValue &&
  //     /*!isNaN(newValue) &&*/
  //     thisWidget.isValid(newValue)
  //   ) {
  //     thisWidget.value = newValue;
  //     thisWidget.announce(); /**/
  //   }
  //   // thisWidget.value = newValue;
  //   thisWidget.renderValue();
  //   // thisWidget.announce();
  // }

  // parseValue(value) {
  //   return parseInt(value);
  // }

  isValid(value) {
    return (
      !isNaN(value) &&
      value >= settings.amountWidget.defaultMin &&
      value <= settings.amountWidget.defaultMax
    );
  }

  renderValue() {
    const thisWidget = this;
    thisWidget.dom.input.value = thisWidget.value;
  }

  initActions() {
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.dom.input.value);
      // thisWidget.value = thisWidget.dom.input.value;
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  // announce() {
  //   const thisWidget = this;
  //   // console.log('announce has been run');
  //   //console.log(thisWidget);
  //   const event = new CustomEvent('updated', {
  //     bubbles: true,
  //   });
  //   thisWidget.element.dispatchEvent(event);
  //   //console.log(event);
  // }
}

export default AmountWidget;
