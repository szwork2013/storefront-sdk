import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SettingsActions);

    let bootstrap = {};
    if (window.storefront.resources && window.storefront.resources._settings) {
      bootstrap = window.storefront.resources._settings;
    }
    this.state = Immutable.fromJS(bootstrap);
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
