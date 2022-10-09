import { templates, select, classNames } from '../settings.js';

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
  }

  initWidgets() {
    const thisHome = this;
    console.log(thisHome);

    thisHome.buttonOne = document.getElementById('buttonOne');
    console.log(thisHome.buttonOne);
    const pages = document.querySelector(select.containerOf.pages).children;
    const navLinks = document.querySelectorAll(select.nav.links);
    thisHome.buttonOne.addEventListener('click', function (event) {
      console.log('button clicked');
      location.replace('/#/order');
      event.preventDefault();
      for (let page of pages) {
        if (page.id !== 'order') {
          page.classList.remove(classNames.pages.active);
          console.log(classNames.pages.active);
        } else {
          page.classList.add(classNames.pages.active);
          console.log(classNames.pages.active);
        }

        for (let link of navLinks) {
          link.classList.toggle(
            classNames.nav.active,
            link.getAttribute('href') == '#' + 'order'
          );
        }
      }
    });
    //a
    thisHome.buttonTwo = document.getElementById('buttonTwo');
    console.log(thisHome.buttonOne);

    thisHome.buttonTwo.addEventListener('click', function (event) {
      console.log('buttontwo clicked');
      location.replace('/#/booking');
      event.preventDefault();
      for (let page of pages) {
        if (page.id !== 'booking') {
          page.classList.remove(classNames.pages.active);
          console.log(classNames.pages.active);
        } else {
          page.classList.add(classNames.pages.active);
          console.log(classNames.pages.active);
        }

        for (let link of navLinks) {
          link.classList.toggle(
            classNames.nav.active,
            link.getAttribute('href') == '#' + 'booking'
          );
        }
      }
    });
  }
}

export default Home;
