import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray } from 'lodash';

let addProducts = function addProducts(state, products) {
  if (!isArray(products)) {
    products = [products];
  }

  let newProducts = state.withMutations(map => {
    products.forEach( product => map.set(product.slug, product) );
  });

  return newProducts;
};

@immutable
class ProductStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);
    this.bindActions(dispatcher.actions.ProductActions);
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = Immutable.Map({});

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
    if (resources['product@vtex.storefront-sdk'] && resources['product@vtex.storefront-sdk']._page) {
      let product = resources['product@vtex.storefront-sdk']._page;
      return this.setState(addProducts(this.state, product));
    }
    if (resources['products@vtex.storefront-sdk'] && resources['products@vtex.storefront-sdk']._page) {
      let products = resources['products@vtex.storefront-sdk']._page;
      return this.setState(addProducts(this.state, products));
    }
  }
}

export default ProductStore;
