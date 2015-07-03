import storefront from 'storefront';
import Alt from 'alt';

// Create Flux
storefront.flux = new Alt();

// Debug mode in localhost
if (window.location.host.indexOf(':3000') !== -1) {
  storefront.flux.dispatcher.register(console.log.bind(console)); //eslint-disable-line no-console
}
