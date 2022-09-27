import { select, classNames, templates, settings } from '../settings.js';
import utils from '../utils.js';
import CartProduct from './CartProduct.js';

class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions();

    // console.log('new Cart', thisCart);
  }

  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(
      select.cart.toggleTrigger
    );
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(
      select.cart.productList
    );
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(
      select.cart.deliveryFee
    );
    // console.log('deliveryFee', deliveryFee);
    thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(
      select.cart.subtotalPrice
    );
    // console.log('subtotalPrice', subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(
      select.cart.totalPrice
    );

    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(
      select.cart.totalNumber
    );
    //new 14.09
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(
      select.cart.address
    );
  }
  initActions() {
    const thisCart = this;
    // console.log(thisCart);
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function () {
      thisCart.update();
      // console.log('updated by widget');
    });
    thisCart.dom.productList.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);
      // console.log('remove in Cart');
    });
    //new 14.09
    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      thisCart.sendOrder();
      console.log('addEventListener - submit - send order');
    });
  }

  add(menuProduct) {
    const thisCart = this;
    // console.log(thisCart);
    const generatedHTML = templates.cartProduct(menuProduct);
    //console.log(generatedHTML);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    // console.log(generatedDOM);
    thisCart.dom.productList.appendChild(generatedDOM);
    // console.log('adding product', menuProduct);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    // console.log('thisCart.products', thisCart.products);
    thisCart.update();
  }

  remove(cartProduct) {
    const thisCart = this;
    // remove HTML
    cartProduct.dom.wrapper.remove();
    // console.log('remove html from cart');

    // remove FROM thisCart.products
    // console.log('cartProduct.id', cartProduct.id);
    const index = thisCart.products.indexOf(cartProduct);
    // console.log('index of product in the list:', index);
    thisCart.products.splice(index, 1);
    // console.log(thisCart.products);
    // cartProduct.remove(cartProduct.dom.wrapper);

    thisCart.update();
    // console.log(remove);
  }

  update() {
    const thisCart = this;
    // console.log('update has been run');
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;
    thisCart.deliveryFee = 0;

    for (let product of thisCart.products) {
      thisCart.totalNumber += product.amount;
      thisCart.subtotalPrice += product.price;
      // console.log(
      //   'thisCart.totalNumber = ' + thisCart.totalNumber,
      //   'thisCart.subtotalPrice = ' + thisCart.subtotalPrice
      // );
    }

    if (thisCart.totalNumber > 0) {
      thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    }
    thisCart.dom.deliveryFee.innerHTML = thisCart.deliveryFee;

    thisCart.totalPrice = thisCart.deliveryFee + thisCart.subtotalPrice;
    thisCart.dom.subtotalPrice.innerHTML = thisCart.subtotalPrice;
    thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;

    // thisCart.dom.totalPrice.innerHTML = thisCart.totalPrice;
    for (let element of thisCart.dom.totalPrice) {
      element.innerHTML = thisCart.totalPrice;
    }

    // console.log('thisCart.totalPrice ' + thisCart.totalPrice);
    // console.log('thisCart.dom.totalPrice ', thisCart.dom.totalPrice);
  }
  //new 14.09
  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;
    console.log(url);
    const payload = {
      address: thisCart.address,
      phone: thisCart.phone,
      totalPrice: thisCart.totalPrice,
      subtotalPrice: thisCart.totalPrice - thisCart.deliveryFee,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };

    for (let prod of thisCart.products) {
      payload.products.push(prod.getData());
    }

    // console.log(payload);

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
        console.log('parsedResponse', parsedResponse);
      });
  }
}

export default Cart;
