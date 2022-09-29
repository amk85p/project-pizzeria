import { templates, select } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

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
    // console.log('element', element);
    // create empty object thisBooking.dom,
    thisBooking.dom = {};

    thisBooking.dom.wrapper = element;

    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    // console.log('thisBooking.dom', thisBooking.dom);
    // dom.peopleAmount and dom.hoursAmount
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.peopleAmount
    );
    // console.log('peopleAmount:', thisBooking.dom.peopleAmount);

    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.hoursAmount
    );
    // console.log('thisBooking.dom.hoursAmount', thisBooking.dom.hoursAmount);

    // select.widgets.datePicker.wrapper i select.widgets.hourPicker.wrapper
    console.log(
      select.widgets.datePicker.wrapper,
      select.widgets.hourPicker.wrapper
    );

    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.datePicker.wrapper
    );
    console.log('thisBooking.dom.datePicker', thisBooking.dom.datePicker);

    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.hourPicker.wrapper
    );
    console.log('thisBooking.dom.hourPicker', thisBooking.dom.hourPicker);
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
    // select.widgets.datePicker.wrapper i select.widgets.hourPicker.wrapper
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    // console.log(thisBooking.datePicker);
    //
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    // console.log(thisBooking.datePicker);
  }
}
export default Booking;
