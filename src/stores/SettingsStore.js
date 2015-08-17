import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SettingsActions);

    let bootstrap = {};
    if (window.storefront.currentRoute) {
      let data = window.storefront.currentRoute;
      bootstrap[data.name] = data.resources._settings;
    }
    this.state = Immutable.fromJS(bootstrap);
  }

  onSaveComponentSuccess({route, id, settings}) {
    this.setState(this.state.set(route, { [id]: { settings } }));
  }
}

export default SettingsStore;
