import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import SearchActions from '../search/actions';
import ProductActions from './actions';

@immutable
class ProductStore {
  constructor() {
    this.bindActions(SearchActions);
    this.bindActions(ProductActions);

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
