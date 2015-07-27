import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ProductStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SearchActions);
    this.bindActions(dispatcher.actions.ProductActions);

    this.state = Immutable.Map({});
  }

  onRequestProductSuccess(product) {
    this.setState(this.state.set(product.slug, product));
  }

  onRequestProductFail(error) {
    this.setState(this.state.set('error', error));
  }

  onRequestSearchSuccess({ products }) {
    let newProducts = this.state.withMutations(map => {
      products.forEach( product => map.set(product.slug, product) );
    });

    this.setState(newProducts);
  }
}

export default ProductStore;
