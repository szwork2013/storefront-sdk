import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ShopStore {
  constructor() {
    this.state = Immutable.fromJS(window._storefront.ShopStore);
  }
}

storefront.flux.addStore('ShopStore', ShopStore);
