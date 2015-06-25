import Immutable from 'immutable';
import immutable from '../utils/immutable';

class ShopStore {
  constructor(storefront) {
    this.bindActions(this.alt.actions.ShopActions);

    this.state = Immutable.Map({
      locale: storefront.ShopStore.locale,
      language: storefront.ShopStore.language,
      countryCode: storefront.ShopStore.countryCode,
      currency: storefront.ShopStore.currency,
      accountName: storefront.ShopStore.accountName,
      categories: Immutable.List(storefront.ShopStore.categories)
    });
  }
}

ShopStore.config = {
  onSerialize(state) {
    return {
      locale: state.get('locale'),
      language: state.get('language'),
      countryCode: state.get('countryCode'),
      currency: state.get('currency'),
      accountName: state.get('accountName'),
      categories: state.get('categories').toJS()
    };
  },

  onDeserialize(data) {
    return Immutable.Map({
      locale: data.locale,
      language: data.language,
      countryCode: data.countryCode,
      currency: data.currency,
      accountName: data.accountName,
      categories: Immutable.List(data.categories)
    });
  }

};

export default immutable(ShopStore);
