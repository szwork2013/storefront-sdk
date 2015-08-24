import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

function getDataFromResources(state, route, resources) {
  if (resources._settings) {
    let settings = resources._settings;
    return state.set(route, Immutable.fromJS(settings));
  }
  return state;
}

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = getDataFromResources(Immutable.Map(), window.storefront.currentRoute.name, window.storefront.currentRoute.resources);
  }

  onSaveSettings({route, id, settings}) {
    // Here we are doing an optmistic update. The data is not saved on the
    // server yet, but it probably will.
    this.oldState = this.state;
    this.setState(this.state.setIn([route, id, 'settings'], Immutable.Map(settings)));
  }

  onSaveSettingsFail(error) {
    // If the server cant update the settings, we go back to the previous state.
    console.warn('Error while saving settings', error);
    this.setState(this.oldState);
  }

  onGetRouteResourcesSuccess({route, resources}) {
    this.setState(getDataFromResources(this.state, route, resources));
  }
}

export default SettingsStore;
