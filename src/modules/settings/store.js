import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SettingsStore {
  constructor() {
    this.bindActions(storefront.flux.actions.SettingsActions);

    this.state = Immutable.fromJS(storefront.settings);
  }

  onSaveComponentSuccess({route, id, settings}) {
    this.setState(this.state.merge({
      [route]: {
        [id]: {
          settings
        }
      }
    }));
  }
}

export default SettingsStore;
