import _each from 'lodash/collection/each';
import Immutable from 'immutable';
import immutable from '../utils/immutable';

class CartStore {
  constructor() {
    this.bindActions(this.alt.actions.CartActions);

    this.state = Immutable.Map({
      orderForm: Immutable.Map(),
      loading: false,
      addLoading: false,
      updateLoading: false,
      error: null
    });
  }

  onRequestCart() {
    this.setState(this.state.set('loading', true));
  }

  onUpdateItems() {
    let value = 0;
    let orderForm = this.state.get('orderForm');
    let items = orderForm.items;

    _each(items, function(item) {
      value += item.sellingPrice * item.quantity;
    });

    orderForm.value = value;

    let newState = this.state.withMutations(map => {
      map.set('updateLoading', true)
         .set('orderForm', orderForm);
    });
    this.setState(newState);
  }

  onRemoveItems(items) {
    let orderForm = this.state.get('orderForm');

    _each(items, function(item) {
      let totalItemValue = item.sellingPrice * item.quantity;
      orderForm.items.splice(item.index, 1);
      orderForm.value -= totalItemValue;
    });

    let newState = this.state.withMutations(map => {
      map.set('updateLoading', true)
         .set('orderForm', orderForm);
    });
    this.setState(newState);
  }

  onAddToCart() {
    this.setState(this.state.set('addLoading', true));
  }

  onRequestSuccess(orderForm) {
    let newState = this.state.withMutations(map => {
      map.set('loading', false)
         .set('addLoading', false)
         .set('updateLoading', false)
         .set('orderForm', orderForm);
    });
    this.setState(newState);
  }

  onRequestFail(error) {
    let newState = this.state.withMutations(map => {
      map.set('loading', false)
         .set('addLoading', false)
         .set('updateLoading', false)
         .set('error', error);
    });
    this.setState(newState);
  }
}

CartStore.config = {
  onSerialize(state) {
    return {
      orderForm: state.get('orderForm').toJS(),
      loading: state.get('loading'),
      addLoading: state.get('addLoading'),
      updateLoading: state.get('updateLoading'),
      error: state.get('error')
    };
  },

  onDeserialize(data) {
    return Immutable.Map({
      orderForm: Immutable.Map(data.orderForm),
      loading: data.loading,
      addLoading: data.addLoading,
      updateLoading: data.updateLoading,
      error: data.error
    });
  }
};

export default immutable(CartStore);
