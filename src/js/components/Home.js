import { templates } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;
    thisHome.render(element);
    thisHome.initWidgets();
    console.log(thisHome);
  }

  render(element) {
    const thisHome = this;
    console.log('thisHome', thisHome);

    const generatedHTML = templates.homeContainer();

    thisHome.dom = {};

    thisHome.dom.wrapper = element;

    thisHome.dom.wrapper.innerHTML = generatedHTML;
    console.log(
      'thisHome.dom.wrapper.innerHTML',
      thisHome.dom.wrapper.innerHTML
    );

    thisHome.buttonOne = document.getElementById('buttonOne');
    console.log(thisHome.buttonOne);

    thisHome.buttonOne.addEventListener('click', function () {
      console.log('button clicked');
      location.replace('/#/order');
    });
  }

  initWidgets() {
    const thisHome = this;
    console.log(thisHome);
  }
}

export default Home;
