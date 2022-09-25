import { settings, select } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';

const app = {
  initMenu: function () {
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for (let productData in thisApp.data.products) {
      new Product(
        thisApp.data.products[productData].id,
        thisApp.data.products[productData]
      );
    }
  },

  initData: function () {
    const thisApp = this;
    //NEW
    thisApp.data = {};

    // thisApp.data = dataSource;
    const url = settings.db.url + '/' + settings.db.products;
    console.log(url);
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        /* save parsedResponse as thisApp.data.products*/
        thisApp.data.products = parsedResponse;
        console.log('parsedResponse', parsedResponse);
        /*execute initMenu method*/
        thisApp.initMenu();
      });

    //thisApp.data {}
  },

  initCart: function () {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    thisApp.ProductList = document.querySelector(select.containerOf.menu);

    thisApp.ProductList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);
    thisApp.initData();
    // thisApp.initMenu();
    thisApp.initCart();
  },
};

app.init();
