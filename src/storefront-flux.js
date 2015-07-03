import Alt from 'alt';
import storefront from 'storefront';

// Create Flux
storefront.flux = new Alt();

// Debug mode in localhost
if (window.location.host.indexOf(':3000') !== -1) {
  storefront.flux.dispatcher.register(console.log.bind(console)); //eslint-disable-line no-console
}

// Bundle default actions and stores
/*eslint-disable no-unused-vars*/
import CartActions from './cart/actions.js';
import CartStore from './cart/store.js';
import ProductActions from './product/actions.js';
import ProductStore from './product/store.js';
import SearchActions from './search/actions.js';
import SearchStore from './search/store.js';
import ShopStore from './shop/store.js';
