import storefront from 'storefront';
import each from 'lodash/collection/each';

// Create Flux
storefront.flux = new Alt();

// Debug mode in localhost
if (window.location.host.indexOf(':3000') !== -1) {
  storefront.flux.dispatcher.register(console.log.bind(console));
}

// Bundle default actions and stores
import cart from './cart';
import product from './product';
import search from './search';
import shop from './shop';
