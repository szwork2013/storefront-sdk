import Immutable from 'immutable';
import immutable from '../utils/immutable';

class ProductStore {

  constructor() {
    this.bindActions(this.alt.actions.SearchActions);
    this.bindActions(this.alt.actions.ProductActions);

    this.state = Immutable.Map();
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

ProductStore.config = {
  onSerialize(state) {
    return state.toJS();
  },

  onDeserialize(data) {
    return Immutable.Map(data);
  }
};

export default immutable(ProductStore);
