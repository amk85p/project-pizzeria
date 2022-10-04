import { templates, select, settings, classNames } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);

    thisBooking.initwidgets();

    thisBooking.getData();

    thisBooking.tableId = null;
  }

  getData() {
    const thisBooking = this;

    const startDateParam =
      settings.db.dateStartParamKey +
      '=' +
      utils.dateToStr(thisBooking.datePicker.minDate);

    const endDateParam =
      settings.db.dateEndParamKey +
      '=' +
      utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [startDateParam, endDateParam],
      eventsCurrent: [settings.db.notRepeatParam, startDateParam, endDateParam],
      eventsRepeat: [settings.db.repeatParam, endDateParam],
    };

    console.log('getData params', params);

    const urls = {
      booking:
        settings.db.url +
        '/' +
        settings.db.booking +
        '?' +
        params.booking.join('&'),

      eventsCurrent:
        settings.db.url +
        '/' +
        settings.db.event +
        '?' +
        params.eventsCurrent.join('&'),

      eventsRepeat:
        settings.db.url +
        '/' +
        settings.db.event +
        '?' +
        params.eventsRepeat.join('&'),
    };

    console.log('getData urls', urls);
    console.log('params', params);

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])

      .then(function (allResponses) {
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];

        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function ([bookings, eventsCurrent, eventsRepeat]) {
        // console.log('bookings', bookings);
        // console.log('eventsCurrent', eventsCurrent);
        // console.log('eventsRepeat', eventsRepeat);
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (
          let loopDate = minDate;
          loopDate <= maxDate;
          loopDate = utils.addDays(loopDate, 1)
        ) {
          thisBooking.makeBooked(
            utils.dateToStr(loopDate),
            item.hour,
            item.duration,
            item.table
          );
        }
      }
    }
    //19:53
    // console.log('thisBooking.booked', thisBooking.booked);
    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (
      let hourBlock = startHour;
      hourBlock < startHour + duration;
      hourBlock += 0.5
    ) {
      // console.log('loop', hourBlock);
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }

      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined' ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] ==
        'undefined'
    ) {
      allAvailable = true;
    }

    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
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
    // console.log('thisBooking.dom.datePicker', thisBooking.dom.datePicker);

    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.hourPicker.wrapper
    );
    // console.log('thisBooking.dom.hourPicker', thisBooking.dom.hourPicker);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(
      select.booking.tables
    );

    console.log('thisBooking.dom.tables', thisBooking.dom.tables);

    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelector(
      select.booking.starters
    );
    // console.log('thisBooking.dom.starters', thisBooking.dom.starters);

    thisBooking.dom.formSubmit = thisBooking.dom.wrapper.querySelector(
      select.booking.formSubmit
    );
    // console.log('thisBooking.dom.formSubmit', thisBooking.dom.formSubmit);

    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(
      select.booking.phone
    );
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(
      select.booking.address
    );
  }

  initwidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.dom.peopleAmount.addEventListener('click', function () {
      thisBooking.dom.peopleAmount = thisBooking.peopleAmount.value;
      console.log('peopleAmount', thisBooking.peopleAmount);
      // console.log('peopleAmount');
    });

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.dom.hoursAmount.addEventListener('click', function () {
      thisBooking.dom.hoursAmount = thisBooking.hoursAmount.value;
      console.log('hoursAmount', thisBooking.hoursAmount);
    });
    // select.widgets.datePicker.wrapper i select.widgets.hourPicker.wrapper
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    // console.log(thisBooking.datePicker);
    //
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    // console.log(thisBooking.datePicker);

    thisBooking.dom.wrapper.addEventListener('updated', function () {
      thisBooking.updateDOM();
    });

    thisBooking.dom.datePicker.addEventListener('updated', function () {
      console.log('date changed');
      thisBooking.resetTables();
    });

    thisBooking.dom.hourPicker.addEventListener('updated', function () {
      console.log('hour changed');
      thisBooking.resetTables();
    });

    for (let table of thisBooking.dom.tables) {
      console.log(table);
      table.addEventListener('click', function (event) {
        // console.log('thisBooking.dom.tables', thisBooking.dom.tables);
        event.preventDefault();
        // thisBooking.resetTables();
        thisBooking.initTables(event);
      });
    }

    thisBooking.dom.formSubmit.addEventListener('click', function (event) {
      event.preventDefault();

      thisBooking.sendBooking();

      console.log('addEventListener - submit - send order');
    });

    thisBooking.starters = [];
    thisBooking.dom.starters.addEventListener('click', function (event) {
      thisBooking.startersClicked = event.target;
      if (thisBooking.startersClicked.name == 'starter') {
        if (thisBooking.startersClicked.checked) {
          console.log(
            'thisBooking.startersClicked',
            thisBooking.startersClicked.value
          );

          thisBooking.starters.push(thisBooking.startersClicked.value);
          // console.log(thisBooking.starters);
        } else {
          const index = thisBooking.starters.indexOf(
            thisBooking.startersClicked.value
          );
          thisBooking.starters.splice(index, 1);
        }
        console.log(thisBooking.starters);
      }
    });
  }

  initTables(event) {
    const thisBooking = this;

    thisBooking.tableClicked = event.target;
    console.log('inittables');
    // SELECT WHAT WAS CLICKED

    console.log(thisBooking.tableClicked);
    if (!thisBooking.tableClicked.classList.contains('booked')) {
      thisBooking.tableId = thisBooking.tableClicked.getAttribute('data-table');
      console.log(typeof thisBooking.tableId);

      if (!thisBooking.tableClicked.classList.contains('selected')) {
        for (let table of thisBooking.dom.tables) {
          console.log(table);
          table.classList.remove('selected');
        }

        thisBooking.tableClicked.classList.add('selected');
        console.log('selected', thisBooking.tableId);
      } else {
        thisBooking.tableClicked.classList.remove('selected');
        console.log('unselected', thisBooking.tableId);
      }
    } else {
      alert('stolik zajęty');
    }
  }

  resetTables() {
    const thisBooking = this;
    console.log('resetTables started');
    // reset selections first
    for (let table of thisBooking.dom.tables) {
      console.log(table);
      table.classList.remove('selected');
    }
  }

  sendBooking() {
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.booking;
    console.log(url);
    thisBooking.tableId = parseInt(thisBooking.tableId);
    console.log(typeof thisBooking.tableId);

    console.log(thisBooking.hour);

    const payload = {
      date: thisBooking.date,
      hour: utils.numberToHour(thisBooking.hour),
      table: thisBooking.tableId || null,
      duration: thisBooking.hoursAmount.value,
      ppl: thisBooking.peopleAmount.value,
      starters: thisBooking.starters,
      address: thisBooking.address,
      phone: thisBooking.phone,
    };
    console.log(payload);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    // console.log(options);

    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (parsedResponse) {
        thisBooking.makeBooked(
          payload.date,
          payload.hour,
          payload.duration,
          payload.table
        );

        thisBooking.updateDOM();
        thisBooking.resetTables();

        console.log('parsedResponse', parsedResponse);
      });
  }
}

export default Booking;
