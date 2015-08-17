import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import isArray from 'lodash/lang/isArray';

@immutable
class ProductStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);
    this.bindActions(dispatcher.actions.ProductActions);

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
    this.setState(this.state.set(product.slug, product));
  }

  onRequestProductFail(error) {
    this.setState(this.state.set('error', error));
  }

  onRequestSearchSuccess({ products }) {
    if (!isArray(products)) {
      products = [products];
    }

    let newProducts = this.state.withMutations(map => {
      products.forEach( product => map.set(product.slug, product) );
    });

    this.setState(newProducts);
  }
}

export default ProductStore;
