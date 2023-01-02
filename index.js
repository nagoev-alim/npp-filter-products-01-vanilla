// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import menu from './data/mock.js';
import { capitalStr } from './modules/capitalStr.js';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='products'>
    <ul class='filter' data-filters=''></ul>
    <ul class='list' data-products=''></ul>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      filters: document.querySelector('[data-filters]'),
      products: document.querySelector('[data-products]'),
    };

    this.products = menu;
    this.renderButtons(this.products);
    this.renderItems(this.products);

    this.DOM.filters.addEventListener('click', this.filterHandler);
  }

  /**
   * @function renderButtons - Render buttons HTML
   * @param data
   */
  renderButtons = (data) => {
    return this.DOM.filters.innerHTML = `
      <li><button class='active' data-id='all'>All</button></li>
      ${[...new Set(data.map((i) => i.category))].map(category => `<li><button data-id='${category}'>${capitalStr(category)}</button></li>`).join('')}`;
  };
  /**
   * @function renderItems - Render items HTML
   * @param data
   */
  renderItems = (data) => {
    return this.DOM.products.innerHTML = `
      ${data.map(({ id, title, price, img, desc }) => `
        <li data-id='${id}'>
          <div class='header'>
            <img src='${img}' alt='${title}'>
          </div>
          <div class='body'>
            <div>
              <h4>${title}</h4>
              <p>$${price}</p>
            </div>
            <p>${desc}</p>
          </div>
        </li>
        `).join('')}
      `;
  };
  /**
   * @function filterHandler - Return filtered products
   * @param id
   */
  filterHandler = ({ target }) => {
    this.DOM.filters.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));

    if (target.tagName === 'BUTTON') {
      target.classList.add('active');
      const { dataset: { id } } = target;
      this.renderItems(id === 'all' ? this.products : this.products.filter(({ category }) => category === id));
    }
  };
}

// ⚡️Class instance
new App();
