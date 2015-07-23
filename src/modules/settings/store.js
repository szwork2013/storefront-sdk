import storefront from 'storefront';
import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import SettingsActions from './actions';

@immutable
class SettingsStore {
  constructor() {
    this.bindActions(SettingsActions);

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
