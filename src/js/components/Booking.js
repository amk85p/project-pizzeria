import { templates, select } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';

class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);

    thisBooking.initwidgets();
  }

  render(element) {
    const thisBooking = this;

    // generate HTML based on template
    const generatedHTML = templates.bookingWidget(element);
    // console.log(generatedHTML);
    //create element using utils.createElementFromHTML
    thisBooking.element = utils.createDOMFromHTML(generatedHTML);
    console.log('element', element);
    // create empty object thisBooking.dom,
    thisBooking.dom = {};

    thisBooking.dom.wrapper = element;

    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    console.log('thisBooking.dom', thisBooking.dom);
    // dom.peopleAmount and dom.hoursAmount
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.peopleAmount
    );
    console.log('peopleAmount:', thisBooking.dom.peopleAmount);

    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.hoursAmount
    );
    console.log('thisBooking.dom.hoursAmount', thisBooking.dom.hoursAmount);
  }

  initwidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.dom.peopleAmount.addEventListener('click', function () {
      console.log('peopleAmount');
    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.dom.hoursAmount.addEventListener('click', function () {
      console.log('hoursAmount');
    });
  }
}
export default Booking;
