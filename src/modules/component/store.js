import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class ComponentStore {
  constructor() {
    this.bindActions(storefront.flux.actions.ComponentActions);

    this.state = Immutable.fromJS(storefront.settings);
  }

  onSaveSettingsSuccess({route, id, settings}) {
    this.setState(this.state.merge({
      [route]: {
        [id]: {
          settings
        }
      }
    }));
  }
}

storefront.flux.addStore('ComponentStore', ComponentStore);
