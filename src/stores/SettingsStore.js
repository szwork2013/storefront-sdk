import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ResourceActions);

    let settings = window.storefront.currentRoute.resources._settings;

    this.state = Immutable.fromJS({'home': settings});
  }

  onSaveSettings({route, id, settings}) {
    this.oldState = this.state;
    this.setState(this.state.setIn([route, id, 'settings'], Immutable.Map(settings)));
  }

  onSaveSettingsFail(error) {
    console.warn('Error while saving settings', error);
    this.setState(this.oldState);
  }

  onGetRouteResourcesSuccess({pathname, resources}) {
    if (resources._settings) {
      let settings = resources._settings;
      this.setState(this.state.set(pathname, Immutable.fromJS(settings)));
    }
  }
}

export default SettingsStore;
