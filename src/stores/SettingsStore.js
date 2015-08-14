import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import find from 'lodash/collection/find';

@immutable
class SettingsStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.SettingsActions);

    let bootstrap = {};
    if (window.storefront.resources && window.storefront.resources.length > 0) {
      let _settings = find(window.storefront.resources, (resource) => resource.name === '_settings');
      bootstrap.home = _settings.data;
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
