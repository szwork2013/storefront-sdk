import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray, values, flatten } from 'lodash';

let addProducts = function addProducts(state, products) {
  if (!isArray(products)) {
    products = [products];
  }

  let newProducts = state.withMutations(map => {
    products.forEach( product => map.set(product.slug, product) );
  });

  return newProducts;
};

let bootstrap = function bootstrap() {
  let products = window.storefront.currentRoute.resources['products@vtex.storefront-sdk'];
  let product = window.storefront.currentRoute.resources['product@vtex.storefront-sdk'];

  let bootstrapData = Immutable.Map();
  for (let searchKey in products) {
    bootstrapData = addProducts(bootstrapData, products[searchKey]);
  }
  for (let searchKey in product) {
    bootstrapData = addProducts(bootstrapData, product[searchKey]);
  }

  return bootstrapData;
};


@immutable
class ProductStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);
    this.bindActions(dispatcher.actions.ProductActions);
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = bootstrap();

    this.exportPublicMethods({
      getProducts: this.getProducts
    });
  }

  getProducts(products) {
    let result = [];

    for (var i = 0; i < products.length; i++) {
      let product = this.state.get(products[i]);
      if (product) {
        result.push(product);
      }
    }

    return result;
  }

  onRequestProductSuccess(product) {
    this.setState(addProducts(this.state, product));
  }

  onRequestProductFail(error) {
    this.setState(this.state.set('error', error));
  }

  onRequestSearchSuccess({ products }) {
    this.setState(addProducts(this.state, products));
  }

  onGetRouteResourcesSuccess({ resources }) {
    if (resources['product@vtex.storefront-sdk']) {
      let products = values(resources['product@vtex.storefront-sdk']);
      return this.setState(addProducts(this.state, products));
    }
    if (resources['products@vtex.storefront-sdk']) {
      let products = flatten(values(resources['products@vtex.storefront-sdk']));
      return this.setState(addProducts(this.state, products));
    }
  }
}

export default ProductStore;
