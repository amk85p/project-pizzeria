export const select = {
  templateOf: {
    menuProduct: '#template-menu-product',
    cartProduct: '#template-cart-product',
    bookingWidget: '#template-booking-widget', // CODE ADDED
    homeContainer: '#template-home-container', // CODE ADDED
  },
  containerOf: {
    home: '#home-page',
    menu: '#product-list',
    cart: '#cart',
    pages: '#pages', // CODE ADDED
    booking: '.booking-wrapper',

    // homepage: '#home-page', // CODE ADDED
  },
  all: {
    menuProducts: '#product-list > .product',
    menuProductsActive: '#product-list > .product.active',
    formInputs: 'input, select',
  },
  menuProduct: {
    clickable: '.product__header',
    form: '.product__order',
    priceElem: '.product__total-price .price',
    imageWrapper: '.product__images',
    amountWidget: '.widget-amount',
    cartButton: '[href="#add-to-cart"]',
  },
  widgets: {
    amount: {
      input: 'input.amount',
      linkDecrease: 'a[href="#less"]',
      linkIncrease: 'a[href="#more"]',
    },
    //new code start
    datePicker: {
      wrapper: '.date-picker',
      input: `input[name="date"]`,
    },
    hourPicker: {
      wrapper: '.hour-picker',
      input: 'input[type="range"]',
      output: '.output',
    },
  },

  booking: {
    peopleAmount: '.people-amount',
    hoursAmount: '.hours-amount',
    tables: '.floor-plan .table',
    starters: '.starters',
    formSubmit: '.btn-secondary',
    phone: 'input[type="tel"]',
    address: 'input[type="text"]',
  },
  nav: {
    links: '.main-nav a',
  },

  homeContainer: {
    home: '#home',
    buttonOne: '#buttonOne',
    buttonTwo: '#buttonTwo',
    homepage: '.home-wrapper',
    carousel: '.main-carousel',
  },
  //new code end

  cart: {
    productList: '.cart__order-summary',
    toggleTrigger: '.cart__summary',
    totalNumber: `.cart__total-number`,
    totalPrice:
      '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
    subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
    deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
    form: '.cart__order',
    formSubmit: '.cart__order [type="submit"]',
    phone: '[name="phone"]',
    address: '[name="address"]',
  },
  cartProduct: {
    amountWidget: '.widget-amount',
    price: '.cart__product-price',
    edit: '[href="#edit"]',
    remove: '[href="#remove"]',
  },
};

export const classNames = {
  menuProduct: {
    wrapperActive: 'active',
    imageVisible: 'active',
  },

  cart: {
    wrapperActive: 'active',
  },
  // CODE ADDED START
  booking: {
    loading: 'loading',
    tableBooked: 'booked',
  },
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
  // CODE ADDED END
};

export const settings = {
  amountWidget: {
    defaultValue: 1,
    defaultMin: 1,
    defaultMax: 9,
  },

  cart: {
    defaultDeliveryFee: 20,
  },

  // CODE ADDED START
  hours: {
    open: 12,
    close: 24,
  },
  datePicker: {
    maxDaysInFuture: 14,
  },
  booking: {
    tableIdAttribute: 'data-table',
  },
  // CODE ADDED END
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    products: 'products',
    orders: 'orders',
    // CODE ADDED START
    booking: 'bookings',
    event: 'events',
    dateStartParamKey: 'date_gte',
    dateEndParamKey: 'date_lte',
    notRepeatParam: 'repeat=false',
    repeatParam: 'repeat_ne=false',
  },
  // CODE ADDED END
};

export const templates = {
  menuProduct: Handlebars.compile(
    document.querySelector(select.templateOf.menuProduct).innerHTML
  ),

  cartProduct: Handlebars.compile(
    document.querySelector(select.templateOf.cartProduct).innerHTML
  ),

  // CODE ADDED START
  bookingWidget: Handlebars.compile(
    document.querySelector(select.templateOf.bookingWidget).innerHTML
  ),

  homeContainer: Handlebars.compile(
    document.querySelector(select.templateOf.homeContainer).innerHTML
  ),
  // CODE ADDED END
};
