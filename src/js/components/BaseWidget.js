class BaseWidget {
  constructor(wrapperElement, initialValue) {
    const thisWidget = this;

    thisWidget.dom = {};
    console.log(thisWidget.dom);
    thisWidget.dom.wrapper = wrapperElement;

    thisWidget.correctValue = initialValue;
  }
  //getter value
  get value() {
    const thisWidget = this;

    return thisWidget.correctValue;
  }
  // setter metoda wykonywana przy każdej próbie ustawiania nowej wartości właściwości value
  set value(value) {
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value);
    // console.log('newValue', newValue);

    // TODO: add validation
    if (
      newValue !== thisWidget.correctValue &&
      /*!isNaN(newValue) &&*/
      thisWidget.isValid(newValue)
    ) {
      thisWidget.correctValue = newValue;
      thisWidget.announce();
      // console.log('thisWidget.correctValue', thisWidget.correctValue);
      /**/
    }
    // thisWidget.correctValue = newValue;
    thisWidget.renderValue();
    // thisWidget.announce();
    // console.log('value', value);
    // console.log('newValue', newValue);
  }

  setValue(value) {
    const thisWidget = this;

    thisWidget.value = value;
    // console.log('setValue');
  }

  parseValue(value) {
    return parseInt(value);
  }

  isValid(value) {
    return !isNaN(value);
    // && value >= settings.amountWidget.defaultMin &&
    // value <= settings.amountWidget.defaultMax
  }
  renderValue() {
    const thisWidget = this;
    thisWidget.dom.wrapper.innerHTML = thisWidget.value;
    // console.log('renderValue', renderValue);
  }

  announce() {
    const thisWidget = this;
    // console.log('announce has been run');
    //console.log(thisWidget);
    const event = new CustomEvent('updated', {
      bubbles: true,
    });
    thisWidget.dom.wrapper.dispatchEvent(event);
    // console.log(event);
  }
}

export default BaseWidget;
