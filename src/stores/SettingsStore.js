import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

function getDataFromResources(state, resources) {
  if (resources._settings) {
    let settings = resources._settings;
    return state.merge(Immutable.fromJS(settings));
  }
  return state;
}

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = getDataFromResources(Immutable.Map(), window.storefront.currentRoute.resources);
  }

  onSaveSettings({id, settings}) {
    // Here we are doing an optmistic update. The data is not saved on the
    // server yet, but it probably will.
    this.oldState = this.state;
    this.setState(this.state.setIn([id, 'settings'], Immutable.Map(settings)));
  }

  onSaveSettingsFail(error) {
    // If the server cant update the settings, we go back to the previous state.
    console.warn('Error while saving settings', error);
    this.setState(this.oldState);
  }

  onGetRouteResourcesSuccess({resources}) {
    this.setState(getDataFromResources(this.state, resources));
  }
}

export default SettingsStore;
