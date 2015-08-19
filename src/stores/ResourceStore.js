import Immutable from 'immutable';
import immutable from 'alt/utils/ImmutableUtil';
import { sortBy, pairs } from 'lodash';

export let _hashRoute = function _hashRoute(route, params) {
  let paramsHash = JSON.stringify(sortBy(pairs(params)));
  return route + paramsHash;
};

@immutable
class ResourceStore {
  constructor(dispatcher) {
    this.bindActions(dispatcher.actions.ResourceActions);

    this.state = Immutable.Map();

    this.exportPublicMethods({
      getResources: this.getResources
    });
  }

  getResources(route, params) {
    let routeHash = _hashRoute(route, params);

    return this.state.get(routeHash);
  }

  onGetRouteResources({route, params}) {
    let routeHash = _hashRoute(route, params);

    this.setState(this.state.set(routeHash, Immutable.Map()));
  }

  onGetRouteResourcesSuccess({route, params, resources}) {
    let routeHash = _hashRoute(route, params);

    let newState = this.state.setIn([routeHash, 'resources'], resources);
    newState = newState.setIn([routeHash, 'error', null]);
    this.setState(newState);
  }

  onGetRouteResourcesError({ route, params, error }) {
    let routeHash = _hashRoute(route, params);

    let newState = this.state.setIn([routeHash, 'resources'], null);
    newState = newState.setIn([routeHash, 'error', error]);
    this.setState(newState);
  }
}

export default ResourceStore;
