import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { isArray, values, flatten } from 'lodash';

function addProducts(state, products) {
  if (!isArray(products)) {
    products = [products];
  }

  let newProducts = state.withMutations(map => {
    products.forEach( product => map.set(product.slug, product) );
  });

  return newProducts;
}

function getDataFromResources(state, resources) {
  let products = [];
  if (resources['product@vtex.storefront-sdk']) {
    products = values(resources['product@vtex.storefront-sdk']);
  }

  if (resources['products@vtex.storefront-sdk']) {
    products = products.concat(flatten(values(resources['products@vtex.storefront-sdk'])));
  }

  return addProducts(state, products);
}


@immutable
class ProductStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);
    this.bindActions(dispatcher.actions.ProductActions);
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = getDataFromResources(Immutable.Map(), window.storefront.currentRoute.resources);

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
    this.setState(getDataFromResources(this.state, resources));
  }
}

export default ProductStore;
