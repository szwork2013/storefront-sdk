import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = Immutable.Map();
  }

  onSaveSettingsSuccess({route, id, settings}) {
    this.setState(this.state.set(route, { [id]: { settings } }));
  }

  onGetRouteResourcesSuccess({route, resources}) {
    if (resources._settings && resources._settings._page) {
      let settings = resources._settings._page;
      this.setState(this.state.set(route, settings));
    }
  }
}

export default SettingsStore;
