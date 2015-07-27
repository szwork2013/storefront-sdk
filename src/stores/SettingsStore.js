import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SettingsActions);

    this.state = Immutable.fromJS(window.storefront.settings);
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
