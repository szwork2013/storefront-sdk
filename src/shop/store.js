import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ShopStore {
  constructor() {
    this.bindActions(storefront.actions.ShopActions);

    this.state = Immutable.fromJS(storefront.ShopStore);
  }
}

storefront.flux.createStore(ShopStore, 'ShopStore');
