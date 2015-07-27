import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ShopStore {
  constructor() {
    window._storefront.ShopStore.token = ('; ' + document.cookie).split('; VtexIdclientAutCookie=').pop().split(';').shift();

    this.state = Immutable.fromJS(window._storefront.ShopStore);
  }
}

export default ShopStore;
